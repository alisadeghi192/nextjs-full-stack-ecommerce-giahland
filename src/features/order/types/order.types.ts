import mongoose from "mongoose";

export type OrderStatus = "processing" | "delivered";

export interface IOrderItem {
  product: mongoose.Types.ObjectId | string;  
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface IOrder {
  user: mongoose.Types.ObjectId | string;     
  items: IOrderItem[];
  totalAmount: number;
  shippingCost: number;
  finalAmount: number;
  status: OrderStatus;
  address: string;
  trackingCode?: string;
  createdAt: Date;
  updatedAt: Date;
}