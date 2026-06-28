import ArticleForm from "@/components/features/blog/ArticleForm";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { redirect } from "next/navigation";
export default async function NewArticlePage() {
  const { user } = await getMeAction();

  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    redirect("/user/profile");
  }

  return (
    <div className="w-full">
      <SectionTitle title="نوشتن مقاله جدید" />
      <ArticleForm />
    </div>
  );
}
