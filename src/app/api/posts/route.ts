// app/api/posts/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");

  const posts = await prisma.post.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : {},
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { categoryId, ...rest } = data;
  const newPost = await prisma.post.create({
    data: {
      ...rest,
      category: categoryId
        ? { connect: { id: Number(categoryId) } }
        : undefined,
    },
  });
  return NextResponse.json(newPost);
}
