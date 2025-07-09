// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { aboutImage, aboutText, aboutTitle } = await req.json();
//     const newAbout = await prisma.about.create({
//       data: {
//         aboutImage,
//         aboutText,
//         aboutTitle,
//       },
//     });

//     return new Response(JSON.stringify(newAbout), { status: 201 });
//   } catch (err) {
//     console.error("About not create", err);
//     return new Response("Something went wrong", { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const about = await prisma.about.findFirst();
//     if (!about) {
//       return new Response("About context not found", { status: 404 });
//     }
//     return new Response(JSON.stringify(about), { status: 200 });
//   } catch (err) {
//     return new Response("Error", { status: 500 });
//   }
// }

// app/api/about/route.ts
import { prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/uploadImage";

export async function POST(req: Request) {
  try {
    const { aboutImageBase64, aboutTitle, aboutText } = await req.json();

    // 1. Base64 resmi Cloudinary'e yükle
    const imageUrl = await uploadImageToCloudinary(aboutImageBase64);

    // 2. Mevcut bir about varsa sil
    await prisma.about.deleteMany(); // Bu sayede önceki about silinir

    // 3. Yeni about kaydı oluştur
    const newAbout = await prisma.about.create({
      data: {
        aboutImage: imageUrl,
        aboutTitle,
        aboutText,
      },
    });

    return new Response(JSON.stringify(newAbout), { status: 201 });
  } catch (error) {
    console.error("About oluşturulurken hata:", error);
    return new Response("Bir hata oluştu", { status: 500 });
  }
}

export async function GET() {
  try {
    const about = await prisma.about.findFirst();

    if (!about)
      return new Response("About içeriği bulunamadı", { status: 404 });

    return new Response(JSON.stringify(about), { status: 200 });
  } catch (error) {
    return new Response("Hata oluştu", { status: 500 });
  }
}
