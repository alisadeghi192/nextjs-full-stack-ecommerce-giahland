import mongoose from "mongoose";

export type OrderStatus = "pending" | "paid" | "delivered";

export type ObjectId = mongoose.Types.ObjectId | string;

export interface IOrderItem {
  product: ObjectId;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface IOrderUserInfo {
  firstName: string;
  lastName: string;
  mobile: string;
  postalCode: string;
}

export interface IOrder {
  user: ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  shippingCost: number;
  finalAmount: number;
  status: OrderStatus;
  address: string;
  trackingCode?: string;
  createdAt: Date;
  updatedAt: Date;
  userInfo: IOrderUserInfo;
  deliveryMethod: "pickup" | "courier";
}