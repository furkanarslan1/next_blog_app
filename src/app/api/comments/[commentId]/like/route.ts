import { getTokenFromCookies, verifyToken } from "@/lib/aut";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { commentId: string } }
// ) {
//   const token = await getTokenFromCookies();
//   if (!token)
//     return NextResponse.json({ ERROR: "Unauthhorized" }, { status: 401 });

//   const user = verifyToken(token);
//   if (!user)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const userId = Number(user.id);
//   const commentId = Number(params.commentId);

//   await prisma.comment.update({
//     where: { id: commentId },
//     data: {
//       likedByUsers: {
//         connect: { id: userId },
//       },
//     },
//   });

//   return NextResponse.json({ success: true });
// }

export async function POST(
  req: Request,
  context: { params: Promise<{ commentId: string }> }
) {
  const params = await context.params;
  const token = await getTokenFromCookies();

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyToken(token);

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = Number(user.id);
  const commentId = Number(params.commentId);

  if (isNaN(commentId) || isNaN(userId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      likedByUsers: {
        connect: { id: userId },
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ commentId: string }> }
) {
  const params = await context.params;

  const token = await getTokenFromCookies();

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyToken(token);

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = Number(user.id);
  const commentId = Number(params.commentId);

  if (isNaN(commentId) || isNaN(userId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      likedByUsers: {
        disconnect: { id: userId },
      },
    },
  });

  return NextResponse.json({ success: true });
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { commentId: string } }
// ) {
//   const token = await getTokenFromCookies();
//   if (!token)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const user = verifyToken(token);
//   if (!user)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const userId = Number(user.id);
//   const commentId = Number(params.commentId);

//   await prisma.comment.update({
//     where: { id: commentId },
//     data: {
//       likedByUsers: {
//         disconnect: { id: userId },
//       },
//     },
//   });

//   return NextResponse.json({ success: true });
// }
