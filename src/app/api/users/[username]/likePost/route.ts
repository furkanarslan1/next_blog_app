// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// interface Params {
//   params: { username: string; postId: string };
// }

// export async function GET(req: Request, context: Params) {
//   const { username } = await context.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//       include: {
//         likedPosts: {
//           select: {
//             id: true,
//             title: true,
//             slug: true,
//             imageUrl: true,
//             description: true,
//             createdAt: true,
//           },
//         },
//       },
//     });

//     if (!user) return NextResponse.json([], { status: 200 });

//     return NextResponse.json(user.likedPosts);
//   } catch (error) {
//     console.error("Error fetching liked posts:", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// import { getTokenFromCookies, verifyToken } from "@/lib/aut";

// export async function POST(req: NextRequest, context: Params) {
//   const { postId } = await context.params;
//   const numericPostId = Number(postId);

//   if (isNaN(numericPostId)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   const token = await getTokenFromCookies();
//   const verified = token ? verifyToken(token) : null;

//   if (!verified || typeof verified.id !== "number") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Kullanıcının zaten beğenip beğenmediğini kontrol et
//     const existingLike = await prisma.user.findFirst({
//       where: {
//         id: verified.id,
//         likedPosts: { some: { id: numericPostId } },
//       },
//     });

//     if (existingLike) {
//       return NextResponse.json(
//         { message: "Post already liked" },
//         { status: 200 }
//       );
//     }

//     // Beğeni ekle
//     await prisma.user.update({
//       where: { id: verified.id },
//       data: {
//         likedPosts: { connect: { id: numericPostId } },
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error liking post:", error);
//     return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, context: Params) {
//   const { postId } = await context.params;
//   const numericPostId = Number(postId);

//   if (isNaN(numericPostId)) {
//     return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//   }

//   const token = await getTokenFromCookies();
//   const verified = token ? verifyToken(token) : null;

//   if (!verified || typeof verified.id !== "number") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Beğeniyi kaldır
//     await prisma.user.update({
//       where: { id: verified.id },
//       data: {
//         likedPosts: { disconnect: { id: numericPostId } },
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error unliking post:", error);
//     return NextResponse.json(
//       { error: "Failed to unlike post" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, verifyToken } from "@/lib/aut";

interface Params {
  params: Promise<{ username: string; postId: string }>;
}

export async function GET(req: NextRequest, context: Params) {
  const { username } = await context.params;

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

export async function POST(req: NextRequest, context: Params) {
  const { postId } = await context.params;
  const numericPostId = Number(postId);

  if (isNaN(numericPostId)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  const token = await getTokenFromCookies();
  const verified = token ? verifyToken(token) : null;

  if (!verified || typeof verified.id !== "number") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingLike = await prisma.user.findFirst({
      where: {
        id: verified.id,
        likedPosts: { some: { id: numericPostId } },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "Post already liked" },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: { id: verified.id },
      data: {
        likedPosts: { connect: { id: numericPostId } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Params) {
  const { postId } = await context.params;
  const numericPostId = Number(postId);

  if (isNaN(numericPostId)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  const token = await getTokenFromCookies();
  const verified = token ? verifyToken(token) : null;

  if (!verified || typeof verified.id !== "number") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id: verified.id },
      data: {
        likedPosts: { disconnect: { id: numericPostId } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unliking post:", error);
    return NextResponse.json(
      { error: "Failed to unlike post" },
      { status: 500 }
    );
  }
}
