// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const { params } = context;
//   const id = Number(params?.id);

//   if (!id || isNaN(id)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   const post = await prisma.post.findUnique({
//     where: { id },
//   });

//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   return NextResponse.json(post);
// }

// export async function DELETE(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const params = await context.params;
//   const numericId = Number(params.id);

//   if (!numericId || isNaN(numericId)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   try {
//     // Önce HomeSlider'daki ilişkili kayıtları sil
//     await prisma.homeSlider.deleteMany({
//       where: { postId: numericId },
//     });

//     // Önce Comment'teki ilişkili yorumları sil
//     await prisma.comment.deleteMany({
//       where: { postId: numericId },
//     });

//     // Eğer BlogQuestion tablosu da ilişkili ise onları da sil
//     await prisma.blogQuestion.deleteMany({
//       where: { postId: numericId },
//     });

//     // Son olarak postu sil
//     await prisma.post.delete({
//       where: { id: numericId },
//     });

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Delete post error:", error);
//     return NextResponse.json(
//       { error: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // ✅ GET fonksiyonu
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = Number(params.id);

//   if (!id || isNaN(id)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   const post = await prisma.post.findUnique({
//     where: { id },
//   });

//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   return NextResponse.json(post);
// }

// // ✅ DELETE fonksiyonu
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const numericId = Number(params.id);

//   if (!numericId || isNaN(numericId)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   try {
//     await prisma.homeSlider.deleteMany({
//       where: { postId: numericId },
//     });

//     await prisma.comment.deleteMany({
//       where: { postId: numericId },
//     });

//     await prisma.blogQuestion.deleteMany({
//       where: { postId: numericId },
//     });

//     await prisma.post.delete({
//       where: { id: numericId },
//     });

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Delete post error:", error);
//     return NextResponse.json(
//       { error: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// }
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("GET /api/posts/:id error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    await prisma.$transaction([
      prisma.homeSlider.deleteMany({ where: { postId: id } }),
      prisma.comment.deleteMany({ where: { postId: id } }),
      prisma.blogQuestion.deleteMany({ where: { postId: id } }),
      prisma.post.delete({ where: { id } }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/posts/:id error:", err);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

