"use server";

import { verifyAccessToken, getAccessTokenFromCookie } from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { IGetMeResponse } from "@/features/auth/types/auth.types";

export async function getMeAction(): Promise<IGetMeResponse> {
  // 1. get token from cookie
  const token = await getAccessTokenFromCookie();

  if (!token) {
    return { user: null };
  }

  // 2. verify token
  const payload = verifyAccessToken(token) as { userId: string; role: string } | null;

  if (!payload || !payload.userId) {
    return { user: null };
  }

  // 3. connect to DB
  await connectToDB();

  // 4. find user by id (exclude password)
  const user = await User.findById(payload.userId).select("-password").lean();

  if (!user) {
    return { user: null };
  }

  // 5. return user
  return {
    user: {
      _id: user._id.toString(),
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      avatar: user.avatar || "/static/images/default-user.jpg",
      address: user.address || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}