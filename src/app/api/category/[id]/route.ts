// // app/api/category/[id]/route.ts
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const numericId = Number(id);

//   await prisma.category.delete({ where: { id: numericId } });
//   return NextResponse.json({ message: "Deleted successfully" });
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const numericId = Number(id);

//   const { name } = await req.json();
//   const updated = await prisma.category.update({
//     where: { id: numericId },
//     data: { name },
//   });

//   return NextResponse.json(updated);
// }

// app/api/category/[id]/route.ts
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  await prisma.category.delete({ where: { id: numericId } });
  return NextResponse.json({ message: "Deleted successfully" });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  const { name } = await req.json();
  const updated = await prisma.category.update({
    where: { id: numericId },
    data: { name },
  });

  return NextResponse.json(updated);
}
