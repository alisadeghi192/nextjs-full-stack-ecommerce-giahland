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
import { toEnglishDigits } from "@/lib/utils/format";

export async function signinAction(
  prevState: ISigninActionResult | null,
  formData: FormData,
): Promise<ISigninActionResult> {
  const mobile = formData.get("mobile") as string;
  const password = formData.get("password") as string;

  const convertedMobile = toEnglishDigits(mobile);

  const data = { mobile : convertedMobile, password };

  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0]?.message || "اطلاعات وارد شده معتبر نیست.",
    };
  }

  const { mobile: validMobile, password: validPassword } = result.data;

  await connectToDB();

  const user = await BaseUser.findOne({ mobile: validMobile });

  if (!user) {
    return {
      success: false,
      message: "نام کاربری یا رمز عبور اشتباه است.",
    };
  }

  if (user.isBlocked) {
    return {
      success: false,
      message: "حساب کاربری شما مسدود شده است. لطفاً با پشتیبانی تماس بگیرید.",
    };
  }

  const isPasswordValid = await verifyPassword(validPassword, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "نام کاربری یا رمز عبور اشتباه است.",
    };
  }

  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(refreshToken);

  return {
    success: true,
    message: "ورود با موفقیت انجام شد.",
  };
}
