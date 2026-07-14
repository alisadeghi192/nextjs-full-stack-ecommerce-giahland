import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";

export async function getOrderByIdAction(orderId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد شوید.",
      order: null,
    };
  }

  if (!orderId) {
    return {
      success: false,
      message: "شناسه سفارش معتبر نیست.",
      order: null,
    };
  }

  await connectToDB();

  const order = await Order.findOne({
    _id: orderId,
    user: user._id,
  }).lean();

  if (!order) {
    return {
      success: false,
      message: "سفارش یافت نشد.",
      order: null,
    };
  }

  return {
    success: true,
    order: JSON.parse(JSON.stringify(order)),
  };
}