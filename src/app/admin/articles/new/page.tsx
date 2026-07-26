import ArticleForm from "@/components/features/blog/ArticleForm";
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: " مقاله جدید | پنل مدیریت",
};
export default async function NewArticlePage() {
  const { user } = await getMeAction();

  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    redirect("/user/profile");
  }

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="نوشتن مقاله جدید" className="mb-0!" />
        <BackButton />
      </div>
      <ArticleForm />
    </section>
  );
}
