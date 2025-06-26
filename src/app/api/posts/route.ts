// app/api/posts/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany();
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
