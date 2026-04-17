import Link from "next/link";

const tabs = [
  { id: "all", label: "همه" },
  { id: "indoor", label: "گیاهان آپارتمانی" },
  { id: "decoration", label: "گیاهان تزئینی" },
  { id: "gift", label: "گیاهان کادویی" },
  { id: "discounted", label: "تخفیف دار ها" },
];

interface ProductsTabsProps {
  activeTab: string;
  currentView: string;
  currentSort: string;
}

export default function ProductsTabs({
  activeTab,
  currentView,
  currentSort,
}: ProductsTabsProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`?category=${tab.id}&view=${currentView}&sort=${currentSort}`}
          className={`border-neutral5 cursor-pointer border-b p-3 text-2xl/6 transition-all max-md:text-xl max-sm:p-2 max-sm:text-base/6 ${
            activeTab === tab.id
              ? "text-primary border-primary border-b-2 font-bold"
              : "text-neutral9 hover:text-primary"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
