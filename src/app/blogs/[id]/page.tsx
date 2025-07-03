import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import RelatedPosts from "./components/RelatedPosts";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) return notFound();

  const post = await prisma.post.findUnique({
    where: { id: numericId },
    include: {
      category: true,
      comments: {
        include: {
          user: {
            select: { username: true },
          },
        },
      },
    },
  });

  if (!post) return notFound();

  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      NOT: { id: post.id },
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug: true,
    },
    take: 4,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold border-b pb-4 text-center">
        {post.title}
      </h1>

      {post.imageUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <div className="text-sm text-white flex flex-wrap gap-4 justify-between">
        <p>
          <strong>Category:</strong>{" "}
          {post.category?.name || "There is no category"}
        </p>
        <p>
          <strong>broadcasting:</strong>{" "}
          {format(new Date(post.createdAt), "dd MMMM yyyy", { locale: tr })}
        </p>
        <p>
          <strong>Update:</strong>{" "}
          {format(new Date(post.updatedAt), "dd MMMM yyyy", { locale: tr })}
        </p>
        <p>
          <strong>Likes:</strong> {post.likeCount}
        </p>
      </div>

      {post.tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.split(",").map((tag) => (
            <span
              key={tag.trim()}
              className="bg-white text-black text-sm px-3 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <p className="text-lg leading-7">{post.content}</p>

      {post.metaDescription && (
        <div className="text-sm text-gray-500 italic">
          <strong>Meta Description:</strong> {post.metaDescription}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h2>

        {post.comments.length === 0 ? (
          <p>There is no comment yet</p>
        ) : (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border p-3 rounded-md bg-gray-50 shadow-sm"
              >
                <p className="font-semibold">{comment.user.username}</p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Posts */}
      {/* {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Related blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <div key={related.id} className="border rounded-md p-4">
                {related.imageUrl && (
                  <div className="relative w-full aspect-video mb-2">
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{related.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )} */}

      <RelatedPosts relatedPosts={relatedPosts} />
    </div>
  );
}
