// // lib/seo/generateBlogMetadata.ts
// import { prisma } from "@/lib/prisma";
// import { Metadata } from "next";

// export async function generateBlogMetadata(id: number): Promise<Metadata> {
//   const post = await prisma.post.findUnique({
//     where: { id },
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
//       description: "This blog could not be found.",
//     };
//   }

//   return {
//     title: post.title,
//     description: post.metaDescription || post.title,
//     keywords: post.tags?.split(",") || [],
//     openGraph: {
//       title: post.title,
//       description: post.metaDescription || post.title,
//       images: post.imageUrl ? [{ url: post.imageUrl }] : [],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.metaDescription || post.title,
//       images: post.imageUrl ? [post.imageUrl] : [],
//     },
//   };
// }

// lib/seo/generateBlogMetadata.ts
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export async function generateBlogMetadata(id: number): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      title: true,
      metaDescription: true,
      tags: true,
      imageUrl: true,
    },
  });

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "This blog could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.metaDescription || post.title,
    keywords: post.tags?.split(",") || [],
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.title,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.title,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}
