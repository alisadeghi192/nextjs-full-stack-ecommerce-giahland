"use server";

import {
    generateAccessToken,
    getRefreshTokenFromCookie,
    setAccessTokenCookie,
    verifyRefreshToken,
} from "@/lib/auth/auth.helpers";

export async function refreshTokenAction() {
  const refreshToken = await getRefreshTokenFromCookie();
  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh Token یافت نشد.",
    };
  }

  const payload = verifyRefreshToken(refreshToken) as {
    userId: string;
    role: string;
  } | null;

  if (!payload?.userId) {
    return {
      success: false,
      message: "Refresh Token نامعتبر است.",
    };
  }

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    role: payload.role,
  });

  await setAccessTokenCookie(newAccessToken);

  return {
    success: true,
    message: "Access Token با موفقیت تمدید شد.",
  };
}