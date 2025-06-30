import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      message: "Logout succesful",
    },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
