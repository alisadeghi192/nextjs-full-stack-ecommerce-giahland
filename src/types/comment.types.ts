
export interface CommentAuthor {
  _id: string;
  name: string;
  avatar?: string;
  role: "admin" | "user" | "plant-doctor";
}

export interface Comment {
  _id: string;
  user: CommentAuthor;
  text: string;
  date: Date;
  reply?: {
    user: CommentAuthor;
    text: string;
    date: Date;
  };
}