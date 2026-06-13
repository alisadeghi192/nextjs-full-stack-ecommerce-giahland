import { USER_ROLES } from "@/lib/constants/roles";
import mongoose, { Schema, SchemaDefinition } from "mongoose";

const baseOptions : SchemaDefinition = {
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
    required : true,
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  avatar: { type: String, default: "/static/images/default-user.webp" },
};

const UserSchema = new Schema(baseOptions, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const RegularUserSchema = new Schema({
  postalCode: {
    type: String,
    default: "",
    match: [/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد"],
  },
  address: { type: String, default: "" },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const RegularUser =
  User.discriminators?.["RegularUser"] ||
  User.discriminator("RegularUser", RegularUserSchema);

const PlantDoctorSchema = new Schema({
  specialties: { type: String, default: "" },
  yearsOfExperience: { type: Number, default: 0 },
  consultationFee: { type: Number, default: 0 },
  successfulConsultations: { type: Number, default: 0 },
  articles: { type: [String], default: [] },
  consultations: { type: [String], default: [] },
});

export const PlantDoctor =
  User.discriminators?.["PlantDoctor"] ||
  User.discriminator("PlantDoctor", PlantDoctorSchema);

export default User;