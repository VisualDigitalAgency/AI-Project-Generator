// auth/jwt.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN ?? "15m";

if (!SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_SECRET and REFRESH_TOKEN_SECRET must be set");
}

export interface TokenPayload {
  sub: string;       // user ID
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signAccessToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
  return jwt.sign(payload, SECRET!, { expiresIn: ACCESS_EXPIRES });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, REFRESH_SECRET!, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET!) as TokenPayload;
}

export function verifyRefreshToken(token: string): { sub: string } {
  return jwt.verify(token, REFRESH_SECRET!) as { sub: string };
}
