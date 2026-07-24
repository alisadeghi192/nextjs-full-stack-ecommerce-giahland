import {
  ICareItem,
  IProductFeatures,
  IProductSEO,
  IProductType
} from "@/features/products/types/product.types";
import mongoose, { Model, Schema } from "mongoose";

const CareItemSchema = new Schema<ICareItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const FeaturesSchema = new Schema<IProductFeatures>(
  {
    overview: { type: [String], default: [] },
    appearance: { type: [String], default: [] },
    warnings: { type: [String], default: [] },
    propagation: { type: [String], default: [] },
    summary: { type: [String], default: [] },
  },
  { _id: false }
);

const SEOSchema = new Schema<IProductSEO>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], default: [] },
    ogImage: { type: String, default: "" },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProductType>(
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
      light:
      { type: [CareItemSchema], default: [] },
      watering: { type: [CareItemSchema], default: [] },
      soil: { type: [CareItemSchema], default: [] },
      temperature: { type: [CareItemSchema], default: [] },
      fertilization: { type: [CareItemSchema], default: [] },
    }  ,
    
    seo: { type: SEOSchema, default: null },
    
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  },
  { timestamps: true }
);

const Product: Model<IProductType> =
mongoose.models.Product || mongoose.model<IProductType>("Product", ProductSchema);

export default Product;