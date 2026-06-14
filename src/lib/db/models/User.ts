import { USER_ROLES } from "@/lib/constants/roles";
import mongoose, { Schema, SchemaDefinition } from "mongoose";

const baseOptions: SchemaDefinition = {
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    trim: true,
    match: [/^09[0-9]{9}$/, "Please enter a valid Iranian mobile number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ],
  },
  role: {
    type: String,
    enum: USER_ROLES,
    default: "user",
    required: true,
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  avatar: { type: String, default: "/static/images/default-user.webp" },
};

const BaseUserSchema = new Schema(baseOptions, { timestamps: true });

const BaseUser = mongoose.models.BaseUser || mongoose.model("BaseUser", BaseUserSchema, "users");

const UserSchema = new Schema({
  postalCode: { type: String, default: "" },
  address: { type: String, default: "" },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const User =
  BaseUser.discriminators?.User ||
  BaseUser.discriminator("User", UserSchema);

const PlantDoctorSchema = new Schema({
  specialties: { type: String, default: "" },
  yearsOfExperience: { type: Number, default: 0 },
  consultationFee: { type: Number, default: 0 },
  successfulConsultations: { type: Number, default: 0 },
  articles: { type: [String], default: [] },
  consultations: { type: [String], default: [] },
});

export const PlantDoctor =
  BaseUser.discriminators?.PlantDoctor ||
  BaseUser.discriminator("PlantDoctor", PlantDoctorSchema);

export default BaseUser;