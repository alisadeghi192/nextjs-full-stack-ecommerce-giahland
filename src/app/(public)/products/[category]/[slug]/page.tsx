import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { fakeProducts } from "@/data/products";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = fakeProducts.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    notFound();
  }

  const hasDiscount = product.discount > 0;

  return (
    <main className="container">
      <Breadcrumb title={product.name} />

      
    </main>
  );
}