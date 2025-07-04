import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

interface JwtPayloadCustom {
  id: string;
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return token;
}

export function verifyToken(token: string): JwtPayloadCustom | null {
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayloadCustom;
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function getUserFromToken(req: Request) {
  const token = await getTokenFromCookies();
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(decoded.id) },
  });

  return user;
}
