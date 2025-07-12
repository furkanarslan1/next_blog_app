// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// interface Params {
//   params: {
//     username: string;
//     postId: string;
//   };
// }

// export async function DELETE(req: Request, { params }: Params) {
//   const { username, postId } = await params;

//   const postIdNum = Number(postId);
//   if (isNaN(postIdNum)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//       select: { id: true },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         likedPosts: {
//           disconnect: { id: postIdNum },
//         },
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("eError unliking post", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request, { params }: Params) {
//   const { username, postId } = await params;

//   const postIdNum = Number(postId);

//   if (isNaN(postIdNum)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//       select: { id: true },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         likedPosts: {
//           connect: { id: postIdNum },
//         },
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error liking post:", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    username: string;
    postId: string;
  }>;
}

export async function DELETE(req: Request, { params }: Params) {
  const { username, postId } = await params; // await gerekiyor çünkü Promise

  const postIdNum = Number(postId);
  if (isNaN(postIdNum)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        likedPosts: {
          disconnect: { id: postIdNum },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unliking post", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  const { username, postId } = await params; // await gerekiyor çünkü Promise

  const postIdNum = Number(postId);

  if (isNaN(postIdNum)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        likedPosts: {
          connect: { id: postIdNum },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
