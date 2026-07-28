"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateOrderStatusAction(
  orderId: string,
  newStatus: "delivered",
) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به تغییر وضعیت سفارش نیستید.",
    };
  }

  if (!orderId) {
    return {
      success: false,
      message: "شناسه سفارش معتبر نیست.",
    };
  }

  await connectToDB();

  const order = await Order.findById(orderId);
  if (!order) {
    return {
      success: false,
      message: "سفارش یافت نشد.",
    };
  }

  if (order.status !== "paid") {
    return {
      success: false,
      message: `وضعیت فعلی "${order.status}" است و فقط سفارش‌های پرداخت شده قابل تغییر به تحویل شده هستند.`,
    };
  }

  order.status = newStatus;
  await order.save();

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/user/orders");
  revalidateTag("admin-stats");
  revalidateTag("admin-revenue");

  return {
    success: true,
    message: "وضعیت سفارش با موفقیت به «تحویل داده شده» تغییر یافت.",
  };
}
