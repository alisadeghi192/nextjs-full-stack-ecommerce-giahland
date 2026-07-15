import { Types } from "mongoose";

export interface DoctorCardInfo {
  _id: string;
  firstName: string;
  lastName: string;
  code?: string;
  avatar: string;
  specialties: string;
  yearsOfExperience: number;
  consultationFee: number;
  successfulConsultations: number;
}

export interface LastMessageInfo {
  text: string;
  sender: "user" | "doctor";
  status: "sent" | "seen";
  createdAt: Date;
}

export interface IConsultation {
  _id: string;
  user: Types.ObjectId | string;
  doctor: Types.ObjectId | string;
  code: string;
  title: string;
  status: "active" | "closed";
  lastMessage: string;
  lastMessageSender: "user" | "doctor";
  lastMessageStatus: "sent" | "seen";
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConsultationMessage {
  _id: Types.ObjectId | string;
  consultationId: Types.ObjectId | string;
  sender: "user" | "doctor";
  text?: string;
  image?: string;
  status: "pending" | "sent" | "seen";
  sentAt?: Date;
  seenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationWithDetails {
  _id: string;
  code: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    consultationFee?: number;
  };
  title: string;
  status: "active" | "closed";
  lastMessage?: LastMessageInfo;
  unreadCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationMessageWithDetails {
  _id: string;
  consultationId: string;
  sender: "user" | "doctor";
  text?: string;
  image?: string;
  status: "pending" | "sent" | "seen";
  sentAt?: Date;
  seenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
