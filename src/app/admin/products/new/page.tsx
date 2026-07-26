import ProductForm from "@/components/admin/forms/ProductForm";
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "  محصول‌جدید | پنل مدیریت",
};

export default async function NewProductPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4"> 
      <SectionTitle title="ایجاد محصول جدید" className="mb-0!"/>
      <BackButton/>
      </div>
      <ProductForm />
    </div>
  );
}