"use server";

import { IGetMeResponse } from "@/features/auth/types/auth.types";
import { getAccessTokenFromCookie, verifyAccessToken } from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function getMeAction(): Promise<IGetMeResponse> {
  const token = await getAccessTokenFromCookie();

  if (!token) {
    return { user: null };
  }

  const payload = verifyAccessToken(token) as { userId: string; role: string } | null;

  if (!payload || !payload.userId) {
    return { user: null };
  }

  await connectToDB();

  const user = await User.findById(payload.userId).select("-password").lean();

  if (!user) {
    return { user: null };
  }

  const baseUser = {
    _id: user._id.toString(),
    mobile: user.mobile,
    email: user.email,
    role: user.role,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    avatar: user.avatar || "/static/images/default-user.webp",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  if (user.role === "user") {
    return {
      user: {
        ...baseUser,
        address: user.address || "",
        postalCode: user.postalCode || "",
        wishlist: user.wishlist || [],
      },
    };
  }

  if (user.role === "plant-doctor") {
    return {
      user: {
        ...baseUser,
        specialties: user.specialties || "",
        yearsOfExperience: user.yearsOfExperience || 0,
        consultationFee: user.consultationFee || 0,
        successfulConsultations: user.successfulConsultations || 0,
        articles: user.articles || [],
        consultations: user.consultations || [],
      },
    };
  }

  return {
    user: baseUser,
  };
}