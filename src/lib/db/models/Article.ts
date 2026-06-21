import { IBlogPost } from "@/features/blog/types/blog.types";
import mongoose, { Model, Schema } from "mongoose";

const ArticleSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "BaseUser",
      required: true,
    },
    category: {
      type: String,
      enum: ["care", "health", "intro"],
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: Schema.Types.Mixed,
      default: [],
    } as any,
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: { type: [String], default: [] },
      ogImage: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.index({ slug: 1 }, { unique: true });

const Article: Model<IBlogPost> =
  mongoose.models.Article || mongoose.model<IBlogPost>("Article", ArticleSchema);

export default Article;