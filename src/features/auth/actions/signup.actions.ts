"use server";

import {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { RegisterSchema } from "@/features/auth/schemas/auth.schema";
import { ISignupActionResult } from "@/features/auth/types/auth.types";

export async function signupAction(
    prevState: ISignupActionResult | null,
  formData: FormData,
): Promise<ISignupActionResult> {
  // 1. extract data from FormData
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const data = { mobile, email, password, confirmPassword };

  // 2. validate with Zod
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

  // 3. connect to DB
  await connectToDB();

  // 4. check existing user
  const existingUser = await User.findOne({
    $or: [{ email: validEmail }, { mobile: validMobile }],
  });

  if (existingUser) {
    return {
      success: false,
      message: "این ایمیل یا شماره موبایل قبلاً ثبت شده است.",
    };
  }

  // 5. hash password
  const hashedPassword = await hashPassword(validPassword);

  // 6. check if this is the first user
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "admin" : "user";

  // 7. create user
  const user = await User.create({
    mobile: validMobile,
    email: validEmail,
    password: hashedPassword,
    role,
  });

  // 8. generate tokens
  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // 9. set cookies
  await setAccessTokenCookie(accessToken);
  await setRefreshTokenCookie(refreshToken);

  // 10. return success
  return {
    success: true,
    message:
      userCount === 0
        ? "ثبت‌نام با موفقیت انجام شد. شما ادمین هستید."
        : "ثبت‌نام با موفقیت انجام شد.",
  };
}
