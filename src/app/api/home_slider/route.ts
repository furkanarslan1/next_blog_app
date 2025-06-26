import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, order } = await req.json();
  if (order < 1 || order > 10) {
    return NextResponse.json(
      { error: "Order must be between 1 and 10" },
      { status: 400 }
    );
  }

  const existing = await prisma.homeSlider.findFirst({ where: { order } });

  const newSliderItem = existing
    ? await prisma.homeSlider.update({
        where: { id: existing.id },
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
