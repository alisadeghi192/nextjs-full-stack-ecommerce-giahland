"use server";

import { IGetMeResponse } from "@/features/auth/types/auth.types";
import {
  getAccessTokenFromCookie,
  verifyAccessToken,
} from "@/lib/auth/auth.helpers";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";

export async function getMeAction(): Promise<IGetMeResponse> {
  const token = await getAccessTokenFromCookie();
  if (!token) return { user: null };

  const payload = verifyAccessToken(token) as {
    userId: string;
    role: string;
  } | null;
  if (!payload?.userId) return { user: null };

  await connectToDB();

  const user = await BaseUser.findById(payload.userId)
    .select("-password")
    .lean();

  if (!user) {
    return { user: null };
  }

  const base = {
    _id: user._id.toString(),
    mobile: user.mobile,
    email: user.email,
    role: user.role,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    avatar: user.avatar || DEFAULT_PROFILE_PIC,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isSuperAdmin: user.isSuperAdmin || false,
  };

  if (user.role === "user") {
    return {
      user: {
        ...base,
        postalCode: (user as any).postalCode || "",
        address: (user as any).address || "",
        isBlocked: (user as any).isBlocked || false,
      },
    };
  }

  if (user.role === "plant-doctor") {
    return {
      user: {
        ...base,
        specialties: (user as any).specialties || "",
        yearsOfExperience: (user as any).yearsOfExperience || 0,
        consultationFee: (user as any).consultationFee || 0,
        successfulConsultations: (user as any).successfulConsultations || 0,
      },
    };
  }

  return { user: base };
}
