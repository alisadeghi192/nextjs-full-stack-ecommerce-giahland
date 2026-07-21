"use server";

import { RegisterSchema } from "@/features/auth/schemas/auth.schema";
import { ISignupActionResult } from "@/features/auth/types/auth.types";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import BaseUser, { User } from "@/lib/db/models/User";

export async function signupAction(
  prevState: ISignupActionResult | null,
  formData: FormData,
): Promise<ISignupActionResult> {
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const data = { mobile, email, password, confirmPassword };

  const result = RegisterSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {
    mobile: validMobile,
    email: validEmail,
    password: validPassword,
  } = result.data;

  await connectToDB();

  const existingUser = await BaseUser.findOne({
    $or: [{ email: validEmail }, { mobile: validMobile }],
  });

  if (existingUser) {
    return {
      success: false,
      message: "این ایمیل یا شماره موبایل قبلاً ثبت شده است.",
    };
  }

  const hashedPassword = await hashPassword(validPassword);
  const userCount = await BaseUser.countDocuments();
  const role = userCount === 0 ? "admin" : "user";
  const isSuperAdmin = userCount === 0;

  let createdUser;
  if (role === "admin") {
    createdUser = await BaseUser.create({
      mobile: validMobile,
      email: validEmail,
      password: hashedPassword,
      role,
      isSuperAdmin,
    });
  } else {
    createdUser = await User.create({
      mobile: validMobile,
      email: validEmail,
      password: hashedPassword,
      role,
      isSuperAdmin,
    });
  }

  const payload = {
    userId: createdUser._id.toString(),
    role: createdUser.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(refreshToken);

  return {
    success: true,
    message:
      userCount === 0
        ? "ثبت‌نام با موفقیت انجام شد. شما ادمین هستید."
        : "ثبت‌نام با موفقیت انجام شد.",
  };
}
