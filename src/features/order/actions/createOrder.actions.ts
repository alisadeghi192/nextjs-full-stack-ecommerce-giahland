"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { CreateOrderSchema } from "@/features/order/schemas/order.schema";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { revalidatePath } from "next/cache";

export async function createOrderAction(input: unknown) {
  const validation = CreateOrderSchema.safeParse(input);
  if (!validation.success) {
    const firstError = Object.values(
      validation.error.flatten().fieldErrors,
    ).flat()[0];
    return {
      success: false,
      message: firstError || "اطلاعات وارد شده معتبر نیست.",
    };
  }

  const { deliveryMethod, userInfo } = validation.data;

  let address = userInfo.address?.trim() || "";
  let postalCode = userInfo.postalCode?.trim() || "";

  if (deliveryMethod === "pickup") {
    address = address || "تحویل حضوری";
    postalCode = postalCode || "۰۰۰۰۰۰۰۰۰۰";
  }

  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
    };
  }

  await connectToDB();

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return {
      success: false,
      message: "سبد خرید شما خالی است.",
    };
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product) {
      return {
        success: false,
        message: "محصولی در سبد خرید یافت نشد.",
      };
    }
    if (product.stock < item.quantity) {
      return {
        success: false,
        message: `موجودی محصول "${product.name}" کافی نیست. (موجودی: ${product.stock})`,
      };
    }
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
      name: product.name,
      image: product.image,
    });
    totalAmount += product.price * item.quantity;
  }

  const shippingCost = deliveryMethod === "courier" ? 300000 : 0;
  const finalAmount = totalAmount + shippingCost;

  const trackingCode = String(Date.now()).slice(-8);

  const order = await Order.create({
    user: user._id,
    items: orderItems,
    totalAmount,
    shippingCost,
    finalAmount,
    trackingCode,
    status: "pending",
    address,
    userInfo: {
      ...userInfo,
      postalCode,
    },
    deliveryMethod,
  });

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  cart.items = [];
  await cart.save();

  revalidatePath("/cart");
  revalidatePath("/user/orders");

  return {
    success: true,
    message: "سفارش شما با موفقیت ثبت شد.",
    orderId: order._id.toString(),
  };
}
