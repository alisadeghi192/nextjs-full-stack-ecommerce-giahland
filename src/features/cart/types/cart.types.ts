import mongoose from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId | string;
  quantity: number;
}

export interface ICart {
  user: mongoose.Types.ObjectId | string;
  items: ICartItem[];
  updatedAt: Date;
}