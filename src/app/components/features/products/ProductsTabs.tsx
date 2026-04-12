import Link from "next/link";

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
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`?category=${tab.id}`}
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