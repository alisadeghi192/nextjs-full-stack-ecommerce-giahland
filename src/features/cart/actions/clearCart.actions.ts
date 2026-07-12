"use server"
import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Cart from "@/lib/db/models/Cart";
import { revalidatePath } from "next/cache";

export async function clearCartAction() {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
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

  cart.items = [];
  await cart.save();

  revalidatePath("/cart");

  return {
    success: true,
    message: "سبد خرید با موفقیت خالی شد.",
  };
}