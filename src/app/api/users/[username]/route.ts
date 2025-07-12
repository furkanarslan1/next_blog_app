// // import { prisma } from "@/lib/prisma";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(
// //   _req: NextRequest,
// //   context: { params: Promise<{ username: string }> } // 🔁 artık Promise
// // ) {
// //   const { username } = await context.params; // ✅ async erişim

// //   const user = await prisma.user.findUnique({
// //     where: { username },
// //     select: {
// //       id: true,
// //       email: true,
// //       firstName: true,
// //     },
// //   });

// //   if (!user) {
// //     return NextResponse.json({ error: "User not found" }, { status: 404 });
// //   }

// //   return NextResponse.json(user);
// // }

// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// // GET: Kullanıcıyı username'e göre getir
// export async function GET(
//   _req: NextRequest,
//   context: { params: Promise<{ username: string }> }
// ) {
//   const { username } = await context.params;

//   const user = await prisma.user.findUnique({
//     where: { username },
//     select: {
//       id: true,
//       email: true,
//       firstName: true,
//       lastName: true,
//       username: true,
//       avatarUrl: true,
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json(user);
// }

// // PUT: Kullanıcı bilgilerini güncelle (profil resim, e-posta, şifre vb.)
// export async function PUT(
//   req: NextRequest,
//   context: { params: Promise<{ username: string }> }
// ) {
//   const { username } = await context.params;
//   const body = await req.json();

//   const { firstName, lastName, email, avatarUrl, password } = body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const updateData: any = {
//       ...(firstName && { firstName }),
//       ...(lastName && { lastName }),
//       ...(email && { email }),
//       ...(avatarUrl && { avatarUrl }),
//     };

//     if (password && password.length >= 6) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       updateData.password = hashedPassword;
//     }

//     const updatedUser = await prisma.user.update({
//       where: { username },
//       data: updateData,
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//         avatarUrl: true,
//         username: true,
//       },
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error("Update user error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

type UpdateUserData = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  password: string;
}>;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 🚀 GET: Kullanıcıyı username'e göre getir
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// 🔁 PUT: Kullanıcı bilgilerini ve profil fotoğrafını güncelle
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    avatarUrl: incomingAvatarUrl,
    password,
  } = body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let avatarUrl = user.avatarUrl;

    // 📷 Eğer gelen avatar base64 formatındaysa (yani yeni resim yüklendiyse)
    if (incomingAvatarUrl?.startsWith("data:image")) {
      const uploaded = await cloudinary.uploader.upload(incomingAvatarUrl, {
        folder: "users",
      });
      avatarUrl = uploaded.secure_url;
    }

    const updateData: UpdateUserData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(avatarUrl && { avatarUrl }),
    };

    // 🔒 Yeni şifre varsa hashle
    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { username },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        username: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
