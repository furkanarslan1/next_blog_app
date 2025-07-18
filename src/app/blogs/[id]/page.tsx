// // app/blogs/[id]/page.tsx

// import { Metadata } from "next";
// import { prisma } from "@/lib/prisma";

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const postId = Number(params.id);
//   const post = await prisma.post.findUnique({
//     where: { id: postId },
//     select: {
//       title: true,
//       metaDescription: true,
//       tags: true,
//       imageUrl: true,
//     },
//   });

//   if (!post) {
//     return {
//       title: "Blog Not Found",
//       description: "The blog you are looking for does not exist.",
//     };
//   }

//   return {
//     title: post.title,
//     description: post.metaDescription || post.title,
//     keywords: post.tags ? post.tags.split(",").map((t) => t.trim()) : [],
//     robots: {
//       index: true,
//       follow: true,
//     },
//     alternates: {
//       canonical: `https://local300/blogs/${postId}`,
//     },
//     openGraph: {
//       title: post.title,
//       description: post.metaDescription || post.title,
//       images: post.imageUrl
//         ? [
//             {
//               url: post.imageUrl,
//               width: 800,
//               height: 600,
//               alt: post.title,
//             },
//           ]
//         : [],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.metaDescription || post.title,
//       images: post.imageUrl ? [post.imageUrl] : [],
//     },
//   };
// }

// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { format } from "date-fns";
// import { tr } from "date-fns/locale";
// import RelatedPosts from "./components/RelatedPosts";
// import Comments from "./components/Comments";
// import { getTokenFromCookies, verifyToken } from "@/lib/aut";
// import BlogChatModal from "./components/BlogChatModal";
// import { Metadata } from "next";
// import { generateBlogMetadata } from "@/lib/seo/generateBlogMetadata";
// import { prisma } from "@/lib/prisma";
// import DoComment from "./components/DoComment";
// import PostLike from "./components/PostLike";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const postId = Number(id);
//   return await generateBlogMetadata(postId);
// }

// export default async function BlogDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const token = await getTokenFromCookies();

//   const verified = token ? verifyToken(token) : null;
//   const currentUserId = verified ? Number(verified.id) : null;
//   const currentUsername = verified ? String(verified.username) : null;
//   const { id } = await params;
//   const numericId = Number(id);

//   if (isNaN(numericId)) return notFound();

//   const post = await prisma.post.findUnique({
//     where: { id: numericId },
//     include: {
//       category: true,
//       comments: {
//         include: {
//           user: {
//             select: { username: true, avatarUrl: true },
//           },
//           likedByUsers: currentUserId
//             ? {
//                 where: { id: currentUserId },
//                 select: { id: true },
//               }
//             : false,
//         },
//       },
//     },
//   });

//   if (!post) return notFound();

//   const relatedPosts = await prisma.post.findMany({
//     where: {
//       categoryId: post.categoryId,
//       NOT: { id: post.id },
//     },
//     select: {
//       id: true,
//       title: true,
//       imageUrl: true,
//       slug: true,
//     },
//     take: 4,
//   });

//   const commentsWithLikedFlag = post.comments.map((comment) => ({
//     id: comment.id,
//     content: comment.content,
//     user: comment.user,
//     likedComments: comment.likedByUsers.length > 0,
//   }));

//   const isLoggedIn = !!currentUserId;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-8 text-sm md:text-lg lg:text-lg">
//       <h1 className="text-3xl font-bold border-b pb-4 text-center">
//         {post.title}
//       </h1>

//       {post.imageUrl && (
//         <div className="relative w-full aspect-video">
//           <Image
//             src={post.imageUrl}
//             alt={post.title}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
//             className="object-cover rounded-md"
//           />
//         </div>
//       )}

//       <div className="text-sm text-white flex flex-wrap gap-4 justify-between">
//         <p>
//           <strong>Category:</strong>{" "}
//           {post.category?.name || "There is no category"}
//         </p>
//         <p>
//           <strong>Broadcasting:</strong>{" "}
//           {format(new Date(post.createdAt), "dd MMMM yyyy", { locale: tr })}
//         </p>
//         <p>
//           <strong>Update:</strong>{" "}
//           {format(new Date(post.updatedAt), "dd MMMM yyyy", { locale: tr })}
//         </p>
//         <p>
//           <strong>Likes:</strong> {post.likeCount}
//         </p>
//       </div>

//       {post.tags && (
//         <div className="flex flex-wrap gap-2 mt-2">
//           {post.tags.split(",").map((tag) => (
//             <span
//               key={tag.trim()}
//               className="bg-white text-black text-sm px-3 py-1 rounded-full"
//             >
//               #{tag.trim()}
//             </span>
//           ))}
//         </div>
//       )}

//       <div
//         className="prose prose-invert max-w-none text-white"
//         dangerouslySetInnerHTML={{ __html: post.content }}
//       />

//       {post.metaDescription && (
//         <div className="text-sm text-gray-500 italic">
//           <strong>Meta Description:</strong> {post.metaDescription}
//         </div>
//       )}

//       <div>
//         <BlogChatModal postId={post.id} isLoggedIn={isLoggedIn} />
//       </div>
//       <div>
//         <h5>Are you liked this post ?</h5>
//         <PostLike username={username} postId={post.id} liked={likedStatus} />
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h2>
//         <div>
//           <DoComment postId={post.id} />
//         </div>

//         <Comments post={commentsWithLikedFlag} />
//       </div>

//       <RelatedPosts relatedPosts={relatedPosts} />
//     </div>
//   );
// }

import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import RelatedPosts from "./components/RelatedPosts";
import Comments from "./components/Comments";
import { getTokenFromCookies, verifyToken } from "@/lib/aut";
import BlogChatModal from "./components/BlogChatModal";
import { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/seo/generateBlogMetadata";
import { prisma } from "@/lib/prisma";
import DoComment from "./components/DoComment";
import PostLike from "./components/PostLike";

type CommentWithUserAndLikes = {
  id: number;
  content: string;
  user: {
    username: string | null;
    avatarUrl: string | null;
  };
  likedByUsers: { id: number }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postId = Number(id);
  return await generateBlogMetadata(postId);
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = await getTokenFromCookies();
  const verified = token ? verifyToken(token) : null;

  const currentUserId =
    verified && !isNaN(Number(verified.id)) ? Number(verified.id) : null;

  let currentUsername: string | null = null;

  if (verified && currentUserId) {
    currentUsername =
      typeof verified.username === "string" ? verified.username : null;

    if (!currentUsername) {
      const user = await prisma.user.findUnique({
        where: { id: currentUserId },
        select: { username: true },
      });
      currentUsername = user?.username ?? null;
    }
  }
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
            : false,
        },
      },
      likedByUsers: currentUserId
        ? {
            where: { id: currentUserId },
            select: { id: true },
          }
        : false,
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

  const commentsWithLikedFlag = post.comments.map(
    (comment: CommentWithUserAndLikes) => ({
      id: comment.id,
      content: comment.content,
      user: {
        username: comment.user.username ?? "",
        avatarUrl: comment.user.avatarUrl,
      },
      likedComments: comment.likedByUsers?.length > 0,
    })
  );
  const isLoggedIn = !!currentUserId;

  // Kullanıcının bu postu beğenip beğenmediğini kontrol et
  const likedStatus = post.likedByUsers && post.likedByUsers.length > 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-sm md:text-lg lg:text-lg relative">
      <h1 className="text-3xl font-bold border-b pb-4 text-center">
        {post.title}
      </h1>

      {post.imageUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
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
          <strong>Broadcasting:</strong>{" "}
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
          {post.tags.split(",").map((tag: string) => (
            <span
              key={tag.trim()}
              className=" bg-white text-black text-xs md:text-sm px-2 py-0.5 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose prose-invert max-w-none text-white"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.metaDescription && (
        <div className="text-sm text-gray-500 italic">
          <strong>Meta Description:</strong> {post.metaDescription}
        </div>
      )}

      <div className="fixed abolute bottom-10 lg:bottom-0 right-10 lg:right-10 z-50  ">
        <BlogChatModal postId={post.id} isLoggedIn={isLoggedIn} />
      </div>

      <div>
        <h5 className="pb-3">Did you like this post?</h5>
        {currentUsername ? (
          <PostLike
            username={currentUsername}
            postId={post.id}
            liked={likedStatus}
            initialLikeCount={post.likeCount}
          />
        ) : (
          <p>Please login to like this post.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Comments</h2>
        <DoComment postId={post.id} />
        <Comments post={commentsWithLikedFlag} />
      </div>

      <RelatedPosts relatedPosts={relatedPosts} />
    </div>
  );
}
