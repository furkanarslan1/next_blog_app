import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface SliderType {
  post: {
    id: number;
    title: string;
    description: string | null; 
    imageUrl: string | null; 
  };
}

export async function GET() {
  try {
    const sliders = await prisma.homeSlider.findMany({
      orderBy: { order: "asc" },
      include: { post: true },
    });

    return NextResponse.json(
      sliders.map((slider: SliderType) => ({
        id: slider.post.id,
        title: slider.post.title,
        description: slider.post.description ?? "",
        imageUrl: slider.post.imageUrl ?? "/default.jpg", 
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
  try {
    const { postId, order } = await req.json();

    if (typeof order !== "number" || order < 1 || order > 10) {
      return NextResponse.json(
        { error: "Order must be a number between 1 and 10" },
        { status: 400 }
      );
    }

    const numericPostId = Number(postId);
    if (isNaN(numericPostId)) {
      return NextResponse.json(
        { error: "Invalid postId" },
        { status: 400 }
      );
    }

    const existing = await prisma.homeSlider.findUnique({ where: { order } });

    const newSliderItem = existing
      ? await prisma.homeSlider.update({
          where: { order },
          data: { postId: numericPostId },
        })
      : await prisma.homeSlider.create({
          data: {
            postId: numericPostId,
            order,
          },
        });

    return NextResponse.json(newSliderItem);
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
