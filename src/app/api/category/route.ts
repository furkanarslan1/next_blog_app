// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// // export async function POST(req: Request) {
// //   const { name } = await req.json();
// //   const category = await prisma.category.create({ data: { name } });
// //   return NextResponse.json(category, { status: 201 });
// // }

// function slugify(text: string) {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")
//     .replace(/\-\-+/g, "-");
// }

// export async function POST(req: NextRequest) {
//   const { name, slug: sentSlug } = await req.json();

//   const slug = sentSlug ?? slugify(name);

//   const existing = await prisma.category.findUnique({
//     where: { slug }, // burası önemli
//   });

//   if (existing) {
//     return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
//   }

//   const newCategory = await prisma.category.create({
//     data: { name, slug },
//   });

//   return NextResponse.json(newCategory);
// }
// // export async function GET() {
// //   const categories = await prisma.category.findMany();
// //   return NextResponse.json(categories);
// // }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const slug = searchParams.get("slug");

//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "6");
//   const skip = (page - 1) * limit;

//   if (!slug) {
//     return NextResponse.json({ error: "Slug is required" }, { status: 400 });
//   }

//   const category = await prisma.category.findUnique({
//     where: { slug },
//     select: { id: true },
//   });

//   if (!category) {
//     return NextResponse.json({ error: "Category not found" }, { status: 404 });
//   }

//   const [posts, total] = await Promise.all([
//     prisma.post.findMany({
//       where: { categoryId: category.id },
//       skip,
//       take: limit,
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.post.count({
//       where: { categoryId: category.id },
//     }),
//   ]);

//   return NextResponse.json({
//     posts,
//     total,
//     totalPages: Math.ceil(total / limit),
//     currentPage: page,
//   });
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}
