import ProductForm from "@/components/admin/forms/ProductForm";
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getProductById } from "@/features/products/actions/getProductById.actions";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "  ویرایش‌ محصول | پنل مدیریت",
};
interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const product = await getProductById(id);
  if (!product) {
    notFound();
  }

  const defaultSeo = {
    title: product.seo?.title || "",
    description: product.seo?.description || "",
    keywords: product.seo?.keywords ? product.seo.keywords.join(", ") : "",
  };

  const defaultValues = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    discount: product.discount || 0,
    stock: product.stock,
    category: product.category,
    mainImage: product.image,
    gallery1: product.images?.[1] || null,
    gallery2: product.images?.[2] || null,
    gallery3: product.images?.[3] || null,
    potMaterial: product.potMaterial || "",
    soilType: product.soilType || "",
    weight: product.weight || 0,
    sunlight: product.sunlight || "",
    potDimensions: product.potDimensions || { length: 0, width: 0, height: 0 },
    features: product.features || {
      overview: [],
      appearance: [],
      warnings: [],
      propagation: [],
      summary: [],
    },
    cares: product.cares || {
      light: [],
      watering: [],
      soil: [],
      temperature: [],
      fertilization: [],
    },
    seo: defaultSeo,
  };

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="ویرایش محصول" className="mb-0!" />
        <BackButton />
      </div>
      <ProductForm defaultValues={defaultValues} isEdit={true} productId={id} />
    </section>
  );
}
