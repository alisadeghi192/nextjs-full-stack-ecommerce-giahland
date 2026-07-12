"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { revalidatePath } from "next/cache";

interface CreateOrderInput {
  address: string;
  isSpecialShipping: boolean; 
}

export async function createOrderAction(input: CreateOrderInput) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
    };
  }

  if (!input.address || input.address.trim().length < 5) {
    return {
      success: false,
      message: "لطفاً آدرس کامل خود را وارد کنید.",
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
        message: `محصولی در سبد خرید یافت نشد.`,
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

  const shippingCost = input.isSpecialShipping ? 300000 : 0;
  const finalAmount = totalAmount + shippingCost;

  const order = await Order.create({
    user: user._id,
    items: orderItems,
    totalAmount,
    shippingCost,
    finalAmount,
    status: "processing",
    address: input.address.trim(),
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