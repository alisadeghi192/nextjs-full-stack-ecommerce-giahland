
export interface IConsultation {
  _id: string;
  user: string;       
  doctor: string;     
  title: string;
  description: string;
  images: string[];
  status: "pending" | "answered" | "closed";
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}


export interface IConsultationMessage {
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


export interface ConsultationWithDetails {
  _id: string;
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
  };
  title: string;
  description: string;
  images: string[];
  status: "pending" | "answered" | "closed";
  lastMessage?: string;
  lastMessageAt?: Date;
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