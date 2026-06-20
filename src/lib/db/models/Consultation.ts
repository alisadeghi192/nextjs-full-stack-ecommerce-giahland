import { IConsultation } from "@/features/consultations/types/consultation.types";
import mongoose, { Model, Schema } from "mongoose";

const ConsultationSchema = new Schema<IConsultation>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaseUser",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaseUser",
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: "مشاوره جدید",
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    lastMessage: { type: String, default: "" },
    lastMessageSender: {
      type: String,
      enum: ["user", "doctor"],
      default: "user",
    },
    lastMessageStatus: {
      type: String,
      enum: ["sent", "seen"],
      default: "sent",
    },
    lastMessageAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Consultation: Model<IConsultation> =
  mongoose.models.Consultation ||
  mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;