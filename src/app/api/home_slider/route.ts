import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sliders = await prisma.homeSlider.findMany({
      orderBy: { order: "asc" },
      include: { post: true },
    });

    return NextResponse.json(
      sliders.map((slider) => ({
        id: slider.post.id,
        title: slider.post.title,
        description: slider.post.description,
        imageUrl: slider.post.imageUrl,
      }))
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { postId, order } = await req.json();
  if (order < 1 || order > 10) {
    return NextResponse.json(
      { error: "Order must be between 1 and 10" },
      { status: 400 }
    );
  }

  const existing = await prisma.homeSlider.findUnique({ where: { order } });

  const newSliderItem = existing
    ? await prisma.homeSlider.update({
        where: { order },
        data: { postId: Number(postId) },
      })
    : await prisma.homeSlider.create({
        data: {
          postId: Number(postId),
          order,
        },
      });
  return NextResponse.json(newSliderItem);
}
