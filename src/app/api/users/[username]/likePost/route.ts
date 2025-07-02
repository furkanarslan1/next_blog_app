import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { username: string };
}

export async function GET(req: Request, { params }: Params) {
  const { username } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        likedPosts: {
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) return NextResponse.json([], { status: 200 });

    return NextResponse.json(user.likedPosts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
