"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
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

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  order.status = "paid";
  await order.save();

  const cart = await Cart.findOne({ user: user._id });
  if (cart && cart.items.length > 0) {
    cart.items = [];
    await cart.save();
  }

  revalidatePath("/user/orders");
  revalidatePath(`/payment/${orderId}`);

  return {
    success: true,
    message: "پرداخت با موفقیت انجام شد.",
    orderId: order._id.toString(),
  };
}
