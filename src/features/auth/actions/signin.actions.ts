"use server";

import { LoginSchema } from "@/features/auth/schemas/auth.schema";
import { ISigninActionResult } from "@/features/auth/types/auth.types";
import {
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  verifyPassword,
} from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";

export async function signinAction(
  prevState: ISigninActionResult | null,
  formData: FormData
): Promise<ISigninActionResult> {
  // 1. extract data from FormData
  const mobile = formData.get("mobile") as string;
  const password = formData.get("password") as string;

  const data = { mobile, password };

  // 2. validate with Zod
  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message || "اطلاعات وارد شده معتبر نیست.",
    };
  }

  const { mobile: validMobile, password: validPassword } = result.data;

  // 3. connect to DB
  await connectToDB();

  // 4. find user by mobile (از BaseUser استفاده کن تا همه نقش‌ها را پیدا کند)
  const user = await BaseUser.findOne({ mobile: validMobile });

  if (!user) {
    return {
      success: false,
      message: "کاربری با این شماره موبایل یافت نشد.",
    };
  }

  // 5. verify password
  const isPasswordValid = await verifyPassword(validPassword, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "رمز عبور اشتباه است.",
    };
  }

  // 6. generate tokens
  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // 7. set cookies
  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(refreshToken);

  // 8. return success
  return {
    success: true,
    message: "ورود با موفقیت انجام شد.",
  };
}