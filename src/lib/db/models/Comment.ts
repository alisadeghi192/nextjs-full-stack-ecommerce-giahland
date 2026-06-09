import mongoose, { Schema, Model } from "mongoose";
import { Comment } from "@/types/comment.types";

const CommentSchema = new Schema<Comment>(
  {
    user: {
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, default: "/static/images/default-user.webp" },
        role: {
          type: String,
          enum: ["admin", "user", "plant-doctor"],
          required: true,
        },
      },
      required: true,
    },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reply: {
      user: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, default: "/static/images/default-user.webp" },
        role: {
          type: String,
          enum: ["admin", "user", "plant-doctor"],
          required: true,
        },
      },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

const CommentModel: Model<Comment> =
  mongoose.models.Comment || mongoose.model<Comment>("Comment", CommentSchema);

export default CommentModel;