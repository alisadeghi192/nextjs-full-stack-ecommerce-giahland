import { IComment } from "@/features/comments/types/comment.types";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import mongoose, { Model, Schema } from "mongoose";

const CommentAuthorSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: DEFAULT_PROFILE_PIC },
    role: {
      type: String,
      enum: ["admin", "user", "plant-doctor"],
      required: true,
    },
  },
  { _id: false },
);

const CommentSchema = new Schema<IComment>(
  {
    targetType: {
      type: String,
      enum: ["products", "blog"],
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
      user: { type: CommentAuthorSchema },
      text: { type: String },
      date: { type: Date,},
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isReadByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

CommentSchema.index({ targetType: 1, targetId: 1, date: -1 });

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
