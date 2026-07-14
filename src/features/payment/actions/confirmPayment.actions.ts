"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import { revalidatePath } from "next/cache";

export async function confirmPaymentAction(orderId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
    };
  }

  if (!orderId) {
    return {
      success: false,
      message: "شناسه سفارش معتبر نیست.",
    };
  }

  await connectToDB();

  const order = await Order.findOne({ _id: orderId, user: user._id });
  if (!order) {
    return {
      success: false,
      message: "سفارش یافت نشد.",
    };
  }

  if (order.status !== "pending") {
    return {
      success: false,
      message: "وضعیت سفارش برای پرداخت مناسب نیست.",
    };
  }

  order.status = "paid";
  await order.save();

  revalidatePath("/user/orders");
  revalidatePath(`/payment/${orderId}`);

  return {
    success: true,
    message: "پرداخت با موفقیت انجام شد.",
    orderId: order._id.toString(),
  };
}