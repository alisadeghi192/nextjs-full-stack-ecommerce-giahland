import mongoose, { Schema, Model } from "mongoose";
import { ProductType, ProductFeatures, CareItem } from "@/features/products/types/product.types";

const CareItemSchema = new Schema<CareItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const FeaturesSchema = new Schema<ProductFeatures>(
  {
    overview: { type: [String], default: [] },
    appearance: { type: [String], default: [] },
    warnings: { type: [String], default: [] },
    propagation: { type: [String], default: [] },
    summary: { type: [String], default: [] },
  },
  { _id: false }
);

const ProductSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["indoor", "decoration", "gift"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    liked: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },

    potMaterial: { type: String, default: "" },
    soilType: { type: String, default: "" },
    weight: { type: Number, default: 0 },
    potDimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    sunlight: { type: String, default: "" },
    images: { type: [String], default: [] },

    features: { type: FeaturesSchema, default: {} },
    cares: {
      light: { type: [CareItemSchema], default: [] },
      watering: { type: [CareItemSchema], default: [] },
      soil: { type: [CareItemSchema], default: [] },
      temperature: { type: [CareItemSchema], default: [] },
      fertilization: { type: [CareItemSchema], default: [] },
    },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  },
  { timestamps: true }
);

const Product: Model<ProductType> =
  mongoose.models.Product || mongoose.model<ProductType>("Product", ProductSchema);

export default Product;