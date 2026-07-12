"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ICartItem } from "@/features/cart/types/cart.types";
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
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  if (!productId || quantity < 1) {
    return {
      success: false,
      message: "اطلاعات معتبر نیست.",
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
      message: `موجودی محصول کافی نیست. (موجودی: ${product.stock})`,
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return {
      success: false,
      message: "سبد خرید شما خالی است.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return {
      success: false,
      message: "محصول در سبد خرید یافت نشد.",
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  item.quantity = quantity;
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
    message: "تعداد محصول با موفقیت به‌روزرسانی شد.",
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