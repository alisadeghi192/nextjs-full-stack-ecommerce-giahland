export interface Comment {
  id?: number;
  name: string;
  role: "admin" | "user" | "plant-doctor";
  date: Date;
  text: string;
  reply?: {
    id?: number;
    name: string;
    role: "admin" | "user" | "plant-doctor";
    date: Date;
    text: string;
  };
}
