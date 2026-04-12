'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ProductTabsItems {
  id: 'indoor' | 'decoration' | 'gift';
  label: string;
}

const tabs: ProductTabsItems[] = [
  { id: "indoor", label: "گیاهان آپارتمانی" },
  { id: "decoration", label: "گیاهان تزئینی" },
  { id: "gift", label: "گیاهان کادویی" },
];

interface ProductsTabsProps {
  activeTab: ProductTabsItems['id'];
}

export default function ProductsTabs({ activeTab }: ProductsTabsProps) {
  const searchParams = useSearchParams();
  
  const view = searchParams.get("view") || "grid";
  const sort = searchParams.get("sort") || "newest";

  const buildLink = (tabId: string) => {
    const params = new URLSearchParams();
    params.set("category", tabId);
    params.set("view", view);
    params.set("sort", sort);
    return `?${params.toString()}`;
  };

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={buildLink(tab.id)}
          className={`border-neutral5 cursor-pointer border-b p-3 text-2xl/6 transition-all ${
            activeTab === tab.id
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-neutral9 hover:text-primary"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}