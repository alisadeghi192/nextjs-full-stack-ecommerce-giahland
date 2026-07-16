import {
  IOrder,
  IOrderItem,
  IOrderUserInfo,
  OrderStatus,
} from "@/features/order/types/order.types";
import mongoose, { Model, Schema } from "mongoose";

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    discount: { type: Number, default: 0 },
  },
  { _id: false },
);

const UserInfoSchema = new Schema<IOrderUserInfo>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"] as OrderStatus[],
      default: "pending",
    },
    address: {
      type: String,
      required: true,
    },
    trackingCode: {
      type: String,
    },
    userInfo: {
      type: UserInfoSchema,
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ["pickup", "courier"],
      required: true,
    },
  },
  { timestamps: true },
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
