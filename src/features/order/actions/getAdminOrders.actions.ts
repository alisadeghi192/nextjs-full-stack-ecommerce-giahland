"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ORDERS_PER_PAGE } from "@/lib/constants/pagination";
import connectToDB from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";

interface GetAdminOrdersParams {
  status?: "pending" | "paid" | "delivered" | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAdminOrders({
  status = "all",
  search = "",
  page = 1,
  limit = ORDERS_PER_PAGE,
}: GetAdminOrdersParams = {}) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
      orders: [],
      total: 0,
      totalPages: 0,
    };
  }

  await connectToDB();

  const filter: any = {};

  if (status !== "all") {
    filter.status = status;
  }

  if (search.trim()) {
    filter.trackingCode = { $regex: search.trim(), $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(filter),
  ]);

  const ordersWithTotal = orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    user: order.user.toString(),
    totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0),
  }));

  return {
    success: true,
    orders: JSON.parse(JSON.stringify(ordersWithTotal)),
    total,
    totalPages: Math.ceil(total / limit),
  };
}