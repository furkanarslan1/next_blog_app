import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { commentId: string };
}

export async function DELETE(req: Request, { params }: Params) {
  const { commentId } = await params;
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
