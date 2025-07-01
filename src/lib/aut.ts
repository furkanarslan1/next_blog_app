import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

import { parse } from "cookie";

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

// export function getUserFromRequest(req: IncomingMessage) {   // this is old road don't use ! be  current
//   const cookiesHeader = req.headers.cookie;
//   if (!cookiesHeader) return null;

//   const token = parse(cookiesHeader).token;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded as JwtPayloadCustom;
//   } catch {
//     return null;
//   }
// }
