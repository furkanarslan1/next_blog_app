import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import RelatedPosts from "./components/RelatedPosts";
import Comments from "./components/Comments";
import { getTokenFromCookies, verifyToken } from "@/lib/aut";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = await getTokenFromCookies();

  const verified = token ? verifyToken(token) : null;
  const currentUserId = verified ? Number(verified.id) : null;
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
            select: { username: true, avatarUrl: true },
          },
          likedByUsers: currentUserId
            ? {
                where: { id: currentUserId },
                select: { id: true },
              }
            : false, // currentUserId yoksa çekme
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

  const commentsWithLikedFlag = post.comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    user: comment.user,
    likedComments: comment.likedByUsers.length > 0, // Beğenmişse true
  }));

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

      <p className="text-lg leading-7 ">{post.content}</p>

      {post.metaDescription && (
        <div className="text-sm text-gray-500 italic">
          <strong>Meta Description:</strong> {post.metaDescription}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h2>

        <Comments post={commentsWithLikedFlag} />
      </div>

      <RelatedPosts relatedPosts={relatedPosts} />
    </div>
  );
}
