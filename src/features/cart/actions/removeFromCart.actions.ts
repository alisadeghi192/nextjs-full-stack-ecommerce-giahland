"use server";
import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import { revalidatePath } from "next/cache";

export async function removeFromCartAction(productId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
    };
  }

  if (!productId) {
    return {
      success: false,
      message: "شناسه محصول معتبر نیست.",
    };
  }

  await connectToDB();

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return {
      success: false,
      message: "سبد خرید شما خالی است.",
    };
  }

  const initialLength = cart.items.length;
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  if (cart.items.length === initialLength) {
    return {
      success: false,
      message: "محصول در سبد خرید یافت نشد.",
    };
  }

  await cart.save();

  revalidatePath("/cart");

  return {
    success: true,
    message: "محصول با موفقیت از سبد خرید حذف شد.",
    cart: JSON.parse(JSON.stringify(cart)),
  };
}
