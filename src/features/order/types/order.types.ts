import mongoose from "mongoose";

export type OrderStatus = "pending" | "paid" | "delivered";
export type ObjectId = mongoose.Types.ObjectId | string;

export interface IOrderItem {
  product: ObjectId;
  quantity: number;
  price: number;
  name: string;
  image: string;
  slug: string;
  category: string;
  discount: number;
}

export interface IOrderUserInfo {
  userId:string;
  firstName: string;
  lastName: string;
  mobile: string;
  postalCode: string;
}

export interface IOrder {
  _id: string;
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


export interface IDashboardOrder {
  _id: string;
  trackingCode?: string;
  finalAmount: number;
  status: "pending" | "paid" | "delivered";
  userInfo: {
    userId:string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}