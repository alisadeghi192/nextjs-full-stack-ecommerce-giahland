import ArticleForm from "@/components/features/blog/ArticleForm";
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { redirect } from "next/navigation";
export default async function NewArticlePage() {
  const { user } = await getMeAction();

  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    redirect("/user/profile");
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <SectionTitle title="نوشتن مقاله جدید" className="mb-0!" />
        <BackButton />
      </div>
      <ArticleForm />
    </div>
  );
}
