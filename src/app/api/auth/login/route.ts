import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const { password: _, ...userData } = user;

    return NextResponse.json(
      { message: "Login successful", user: userData },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
