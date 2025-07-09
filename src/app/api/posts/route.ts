// app/api/posts/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const categoryId = req.nextUrl.searchParams.get("categoryId");

//   const posts = await prisma.post.findMany({
//     where: categoryId ? { categoryId: Number(categoryId) } : {},
//   });

//   return NextResponse.json(posts);
// }

// export async function POST(req: Request) {
//   const data = await req.json();
//   const { categoryId, ...rest } = data;
//   const newPost = await prisma.post.create({
//     data: {
//       ...rest,
//       category: categoryId
//         ? { connect: { id: Number(categoryId) } }
//         : undefined,
//     },
//   });
//   return NextResponse.json(newPost);
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : {},
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({
      where: categoryId ? { categoryId: Number(categoryId) } : {},
    }),
  ]);

  return NextResponse.json({ posts, total });
}

// export async function POST(req: Request) {
//   const data = await req.json();
//   const { categoryId, ...rest } = data;
//   const newPost = await prisma.post.create({
//     data: {
//       ...rest,
//       category: categoryId
//         ? { connect: { id: Number(categoryId) } }
//         : undefined,
//     },
//   });
//   return NextResponse.json(newPost);
// }

export async function POST(req: Request) {
  const data = await req.json();
  const { categoryId, tags, keywords, ...rest } = data;

  // Tags ve keywords'ü normalize et (diziye çevir, temizle)
  const parsedTags =
    typeof tags === "string"
      ? tags
          .split(",")
          .map((t: string) => t.trim().toLowerCase())
          .filter(Boolean)
      : [];

  const parsedKeywords =
    typeof keywords === "string"
      ? keywords
          .split(",")
          .map((k: string) => k.trim().toLowerCase())
          .filter(Boolean)
      : [];

  const newPost = await prisma.post.create({
    data: {
      ...rest,
      tags: parsedTags.join(","),
      keywords: parsedKeywords.join(","),
      category: categoryId
        ? { connect: { id: Number(categoryId) } }
        : undefined,
    },
  });

  return NextResponse.json(newPost);
}
