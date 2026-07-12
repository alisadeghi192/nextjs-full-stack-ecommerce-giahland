"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Product from "@/lib/db/models/Product";
import { revalidatePath } from "next/cache";


export async function addToCartAction(productId: string, quantity: number = 1) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا ثبت‌نام یا لاگین کنید.",
    };
  }

  if (!productId || quantity < 1) {
    return {
      success: false,
      message: "اطلاعات محصول معتبر نیست.",
    };
  }

  await connectToDB();

  const product = await Product.findById(productId);
  if (!product) {
    return {
      success: false,
      message: "محصول یافت نشد.",
    };
  }

  if (product.stock < quantity) {
    return {
      success: false,
      message: `موجودی محصول کافی نیست. (موجودی: ${product.stock})`,
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
        message: `موجودی محصول کافی نیست. (موجودی: ${product.stock})`,
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

  revalidatePath("/cart");
  revalidatePath("/products");

  return {
    success: true,
    message: "محصول با موفقیت به سبد خرید اضافه شد.",
    cart: JSON.parse(JSON.stringify(cart)),
  };
}