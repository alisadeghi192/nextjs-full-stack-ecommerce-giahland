import Link from "next/link";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  currentSort: string;
  currentView?: string;  
}

export default function Tabs({
  tabs,
  activeTab,
  currentSort,
  currentView,
}: TabsProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`?category=${tab.id}&sort=${currentSort}${currentView ? `&view=${currentView}` : ""}`}
          className={`border-neutral5 cursor-pointer border-b p-3 text-xl/6 max-lg:text-xl/6 transition-all  max-sm:p-2  max-xs:text-base max-md:text-lg ${
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