// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// interface Params {
//   params: Promise<{ commentId: string }>;
// }

// export async function DELETE(req: Request, context: Params) {
//   const { commentId } = await context.params;
//   const commentIdNum = Number(commentId);

//   if (isNaN(commentIdNum)) {
//     return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
//   }

//   try {
//     const deleted = await prisma.comment.delete({
//       where: { id: commentIdNum },
//     });

//     return NextResponse.json({ success: true, deleted });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Comment not found or cannot delete" },
//       { status: 500 }
//     );
//   }
// }
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
    console.log(error);
    return NextResponse.json(
      { error: "Comment not found or cannot delete" },
      { status: 500 }
    );
  }
}

