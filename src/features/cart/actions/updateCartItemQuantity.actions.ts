"use server";
import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import Product from "@/lib/db/models/Product";
import { revalidatePath } from "next/cache";

export async function updateCartItemQuantityAction(
  productId: string,
  quantity: number
) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
    };
  }

  if (!productId || quantity < 1) {
    return {
      success: false,
      message: "اطلاعات معتبر نیست.",
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

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return {
      success: false,
      message: "سبد خرید شما خالی است.",
    };
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return {
      success: false,
      message: "محصول در سبد خرید یافت نشد.",
    };
  }

  item.quantity = quantity;

  await cart.save();

  revalidatePath("/cart");

  return {
    success: true,
    message: "تعداد محصول با موفقیت به‌روزرسانی شد.",
    cart: JSON.parse(JSON.stringify(cart)),
  };
}