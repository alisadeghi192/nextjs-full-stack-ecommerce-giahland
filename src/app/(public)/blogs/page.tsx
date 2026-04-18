import BlogsHeader from "@/components/features/blogs/BlogsHeader";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";

export default async function BlogsPage() {
  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <BlogsHeader />
      </section>
    </main>
  );
}
