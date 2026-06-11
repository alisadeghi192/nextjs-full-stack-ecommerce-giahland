import { IUser } from "@/features/user/types/user.types";
import { USER_ROLES } from "@/lib/constants/roles";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
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
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "/static/images/default-user.webp",
    },
    postalCode: {
      type: String,
      default: "",
      match: [/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد"],
    },
    address: {
      type: String,
      default: "",
    },
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
