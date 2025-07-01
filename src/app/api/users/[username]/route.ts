import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ username: string }> } // 🔁 artık Promise
) {
  const { username } = await context.params; // ✅ async erişim

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      email: true,
      firstName: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
