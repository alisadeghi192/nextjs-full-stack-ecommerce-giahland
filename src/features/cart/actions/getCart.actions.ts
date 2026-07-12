"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";

export async function getCartAction() {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  await connectToDB();

  const cart = await Cart.findOne({ user: user._id })
    .populate({
      path: "items.product",
      model: "Product",
      select: "name price image discount stock",
    })
    .lean();

  if (!cart) {
    return {
      success: true,
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  const items = cart.items || [];
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  let totalPrice = 0;
  for (const item of items) {
    const product = item.product as any;
    if (product) {
      const price = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;
      totalPrice += price * item.quantity;
    }
  }

  return {
    success: true,
    items: items.map((item) => ({
      productId: (item.product as any)._id.toString(),
      name: (item.product as any).name,
      price: (item.product as any).price,
      discount: (item.product as any).discount || 0,
      image: (item.product as any).image,
      stock: (item.product as any).stock,
      quantity: item.quantity,
    })),
    totalItems,
    totalPrice,
  };
}