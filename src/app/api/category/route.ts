import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  const category = await prisma.category.create({ data: { name } });
  return NextResponse.json(category, { status: 201 });
}

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}
