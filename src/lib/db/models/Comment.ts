import mongoose, { Schema, Model } from "mongoose";
import { IComment } from "@/types/comment.types";

const CommentAuthorSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "/static/images/default-user.webp" },
    role: {
      type: String,
      enum: ["admin", "user", "plant-doctor"],
      required: true,
    },
  },
  { _id: false }
);

const CommentSchema = new Schema<IComment>(
  {
    targetType: {
      type: String,
      enum: ["product", "blog"],
      required: true,
    },
    targetId: {
      type: String,
      required: true,
      index: true, 
    },
    user: { type: CommentAuthorSchema, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reply: {
      user: { type: CommentAuthorSchema, required: true },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

CommentSchema.index({ targetType: 1, targetId: 1, date: -1 });

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;