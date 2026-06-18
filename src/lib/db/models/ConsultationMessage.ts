import { IConsultationMessage } from "@/features/consultations/types/consultation.types";
import mongoose, { Model, Schema } from "mongoose";

const ConsultationMessageSchema = new Schema<IConsultationMessage>(
  {
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "doctor"],
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "seen"],
      default: "pending",
    },
    sentAt: {
      type: Date,
    },
    seenAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ConsultationMessage: Model<IConsultationMessage> =
  mongoose.models.ConsultationMessage ||
  mongoose.model<IConsultationMessage>("ConsultationMessage", ConsultationMessageSchema);

export default ConsultationMessage;