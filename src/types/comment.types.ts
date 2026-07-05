export interface CommentAuthor {
  _id: string;
  name: string;
  avatar?: string;
  role: "admin" | "user" | "plant-doctor";
}

export interface IComment {
  _id: string;
  targetType?: "products" | "blog";
  targetId?: string;
  user: CommentAuthor;
  text: string;
  date: Date;
  reply?: {
    user: CommentAuthor;
    text: string;
    date: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
  isApproved?: boolean;
  isReadByAdmin?: boolean;
}
