"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";

interface GetUsersParams {
  role?: "all" | "admin" | "user" | "plant-doctor";
  status?: "all" | "blocked";
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest"; 
}

export async function getUsers({
  role = "all",
  status = "all",
  search = "",
  page = 1,
  limit = 12,
  sort = "newest"
}: GetUsersParams = {}) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
      users: [],
      total: 0,
      totalPages: 0,
    };
  }

  await connectToDB();

  const sortOption = sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };
  const filter: any = {};

  if (role !== "all") {
    filter.role = role;
  }

 if (status === "blocked") {
    filter.$and = [
      { role: "user" },
      { isBlocked: true },
    ];
  }

  if (search.trim()) {
    filter.$or = [
      { firstName: { $regex: search.trim(), $options: "i" } },
      { lastName: { $regex: search.trim(), $options: "i" } },
      { mobile: { $regex: search.trim(), $options: "i" } },
      { email: { $regex: search.trim(), $options: "i" } },
    ];
  }


  const skip = (page - 1) * limit;


  const [users, total] = await Promise.all([
    BaseUser.find(filter)
      .select("-password")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    BaseUser.countDocuments(filter),
  ]);

  return {
    success: true,
    users: users.map((u) => ({
      _id: u._id.toString(),
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      mobile: u.mobile,
      email: u.email,
      role: u.role,
      avatar: u.avatar || "/static/images/default-user.webp",
      isBlocked: u.isBlocked || false,
      createdAt: u.createdAt,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}