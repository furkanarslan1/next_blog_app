import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, verifyToken } from "@/lib/aut";

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenFromCookies();
    const verified = token ? verifyToken(token) : null;

    if (!verified || typeof verified.id !== "number") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, postId } = body;

    if (!content || !postId) {
      return NextResponse.json(
        { error: "Content and Post ID are required." },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        userId: verified.id,
      },
    });

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the comment." },
      { status: 500 }
    );
  }
}

interface Params {
  params: Promise<{ commentId: string }>;
}

export async function DELETE(req: Request, context: Params) {
  const { commentId } = await context.params;
  const commentIdNum = Number(commentId);

  if (isNaN(commentIdNum)) {
    return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
  }

  try {
    const deleted = await prisma.comment.delete({
      where: { id: commentIdNum },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    return NextResponse.json(
      { error: "Comment not found or cannot delete" },
      { status: 500 }
    );
  }
}
