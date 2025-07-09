// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const slug = req.nextUrl.searchParams.get("slug");

//   if (!slug) {
//     return NextResponse.json(
//       { error: "Category slug is required" },
//       { status: 400 }
//     );
//   }

//   const category = await prisma.category.findUnique({
//     where: { slug },
//   });

//   if (!category) {
//     return NextResponse.json({ error: "Category not found" }, { status: 404 });
//   }

//   const posts = await prisma.post.findMany({
//     where: { categoryId: category.id },
//     orderBy: { createdAt: "desc" },
//     include: {
//       category: true,
//     },
//   });

//   return NextResponse.json(posts);
// }

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "6");
  const skip = (page - 1) * limit;

  if (!slug) {
    return NextResponse.json(
      { error: "Category slug is required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { categoryId: category.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { category: true },
    }),
    prisma.post.count({ where: { categoryId: category.id } }),
  ]);

  return NextResponse.json({
    posts,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  });
}
