import ProductForm from "@/components/admin/forms/ProductForm";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="w-full">
      <SectionTitle title="ایجاد محصول جدید"/>
      <ProductForm />
    </div>
  );
}