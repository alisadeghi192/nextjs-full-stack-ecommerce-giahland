import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

const generateAccessToken = (payload: object): string => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1d" });
};

const verifyAccessToken = (token: string): object | null => {
  try {
    const tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return tokenPayload as object;
  } catch (err) {
    console.error("Verify Access Token Error ->", err);
    return null;
  }
};

const generateRefreshToken = (payload: object): string => {
  return sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "30d" });
};

const verifyRefreshToken = (token: string): object | null => {
  try {
    const tokenPayload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    return tokenPayload as object;
  } catch (err) {
    console.error("Verify Refresh Token Error ->", err);
    return null;
  }
};

const setAccessTokenCookie = async (token: string): Promise<void> => {
  (await cookies()).set({
    name: "accessToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
};

const setRefreshTokenCookie = async (token: string): Promise<void> => {
  (await cookies()).set({
    name: "refreshToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
};

const getAccessTokenFromCookie = async (): Promise<string | null> => {
  const cookie = await cookies();
  return cookie.get("accessToken")?.value || null;
};

const getRefreshTokenFromCookie = async (): Promise<string | null> => {
  const cookie = await cookies();
  return cookie.get("refreshToken")?.value || null;
};

const deleteAuthCookies = async (): Promise<void> => {
  const cookie = await cookies();
  cookie.delete("accessToken");
  cookie.delete("refreshToken");
};

export {
  deleteAuthCookies,
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  hashPassword,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  verifyAccessToken,
  verifyPassword,
  verifyRefreshToken
};

