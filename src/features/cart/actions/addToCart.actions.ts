"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Product from "@/lib/db/models/Product";
import { toPersianNumber } from "@/lib/utils/format";
import { revalidatePath } from "next/cache";
import { ICartItem } from "../types/cart.types";

export async function addToCartAction(productId: string, quantity: number = 1) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا ثبت‌نام یا لاگین کنید.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  if (!productId || quantity < 1) {
    return {
      success: false,
      message: "اطلاعات محصول معتبر نیست.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  await connectToDB();

  const product = await Product.findById(productId);
  if (!product) {
    return {
      success: false,
      message: "محصول یافت نشد.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  if (product.stock < quantity) {
    return {
      success: false,
      message: `موجودی محصول کافی نیست. (موجودی: ${toPersianNumber(product.stock)})`,
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  let cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    cart = new Cart({ user: user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.stock < newQuantity) {
      return {
        success: false,
        message: `موجودی محصول کافی نیست. (موجودی: ${toPersianNumber(product.stock)})`,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }
    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: productId,
      quantity: quantity,
    });
  }

  await cart.save();

  const populatedCart = await Cart.findOne({ user: user._id })
    .populate({
      path: "items.product",
      model: "Product",
      select: "name price image discount stock potDimensions slug category",
    })
    .lean();

  const items = (populatedCart?.items as any as ICartItem[]) || [];
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  let totalPrice = 0;
  for (const item of items) {
    const p = item.product as any;
    if (p && p.price) {
      const price = p.discount > 0
        ? p.price * (1 - p.discount / 100)
        : p.price;
      totalPrice += price * item.quantity;
    }
  }

  revalidatePath("/cart");

  return {
    success: true,
    message: "محصول با موفقیت به سبد خرید اضافه شد.",
    items: items.map((item) => ({
      quantity: item.quantity,
      product: {
        _id: (item.product as any)._id?.toString() || item.product,
        name: (item.product as any).name || "",
        price: (item.product as any).price || 0,
        image: (item.product as any).image || "",
        discount: (item.product as any).discount || 0,
        stock: (item.product as any).stock || 0,
        potDimensions: (item.product as any).potDimensions || {
          length: 0,
          width: 0,
          height: 0,
        },
        slug: (item.product as any).slug || "",
        category: (item.product as any).category || "",
      },
    })),
    totalItems,
    totalPrice,
  };
}