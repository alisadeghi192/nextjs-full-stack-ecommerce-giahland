"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { CreateOrderSchema } from "@/features/order/schemas/order.schema";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { getDiscountedPrice } from "@/lib/utils/price";
import { revalidatePath, revalidateTag } from "next/cache";

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
      slug: product.slug,
      category: product.category,
      discount: product.discount,
    });
    totalAmount +=
      getDiscountedPrice(product.price, product.discount) * item.quantity;
  }

  const shippingCost = deliveryMethod === "courier" ? 300000 : 0;
  const finalAmount = totalAmount + shippingCost;

  const existingOrder = await Order.findOne({
    user: user._id,
    status: "pending",
  });

  if (existingOrder) {
    existingOrder.items = orderItems;
    existingOrder.totalAmount = totalAmount;
    existingOrder.shippingCost = shippingCost;
    existingOrder.finalAmount = finalAmount;
    existingOrder.address = address;
    existingOrder.userInfo = {
      ...userInfo,
      postalCode,
    };
    existingOrder.deliveryMethod = deliveryMethod;

    await existingOrder.save();

    revalidatePath("/user/orders");

    return {
      success: true,
      message: "اطلاعات سفارش به‌روزرسانی شد.",
      orderId: existingOrder._id.toString(),
      redirect: `/payment/${existingOrder._id}`,
    };
  }

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

  revalidatePath("/cart");
  revalidatePath("/user/orders");
  revalidateTag("admin-stats");
  revalidateTag("admin-revenue");
  revalidateTag("admin-recent-orders");
  return {
    success: true,
    message: "سفارش شما با موفقیت ثبت شد.",
    orderId: order._id.toString(),
  };
}
