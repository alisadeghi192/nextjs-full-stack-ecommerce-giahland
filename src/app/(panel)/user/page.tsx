import { redirect } from "next/navigation";

export default function UserDashboardPage() {
  redirect("/user/profile");
}
