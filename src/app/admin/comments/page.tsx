import AdminCommentsList from "@/components/admin/AdminCommentsList";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getComments } from "@/features/comments/actions/getComments.actions";
import { redirect } from "next/navigation";

export default async function AdminCommentsPage() {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    redirect("/admin/dashboard");
  }

  const comments = await getComments();

  return (
    <div>
      <SectionTitle title="مدیریت کامنت‌ها" />
      <AdminCommentsList comments={comments} />
    </div>
  );
}