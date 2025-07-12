// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// interface Params {
//   params: Promise<{ username: string }>;
// }

// export async function GET(req: Request, context: Params) {
//   const { username } = await context.params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username: username.toLowerCase() },
//       select: { id: true },
//     });
//     console.log("User found:", user);

//     if (!user) {
//       //   return NextResponse.json({ error: "User not  found" }, { status: 404 });
//       return NextResponse.json([], { status: 200 });
//     }

//     const comments = await prisma.comment.findMany({
//       where: { userId: user.id },
//       include: {
//         post: {
//           select: {
//             id: true,
//             title: true,
//             slug: true,
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(comments);
//   } catch (error) {
//     // return NextResponse.json(
//     //   { error: "Internal Server Error" },
//     //   { status: 500 }
//     // );
//     console.error("GET /api/user/[username]/comments error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ username: string }>;
}

export async function GET(req: NextRequest, context: Params) {
  const { username } = await context.params;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json([], { status: 200 });
    }

    const comments = await prisma.comment.findMany({
      where: { userId: user.id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/user/[username]/comments error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
