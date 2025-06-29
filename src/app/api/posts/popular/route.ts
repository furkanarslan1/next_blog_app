import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const popularPosts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        likeCount: "desc",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(popularPosts);
  } catch (err) {
    console.log("Error fetching top liked posts:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
