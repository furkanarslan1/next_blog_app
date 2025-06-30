import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topCommentPosts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        comments: true,
        category: true,
      },
    });

    return NextResponse.json(topCommentPosts);
  } catch (err) {
    console.log("Error fetching most comment post", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
