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
  usedInPanel?: boolean;
}

export default function Tabs({
  tabs,
  activeTab,
  currentSort,
  currentView,
  usedInPanel = false,
}: TabsProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`?category=${tab.id}&sort=${currentSort}${currentView ? `&view=${currentView}` : ""}`}
          className={`border-neutral5 dark:border-neutral10 cursor-pointer border-b transition-all ${usedInPanel ? "p-2 text-lg max-md:text-base" : "max-xs:text-base p-3 text-xl/6 max-lg:text-xl/6 max-md:text-lg max-sm:p-2"} ${
            activeTab === tab.id
              ? "text-primary dark:text-primary-dark border-primary dark:border-primary-dark border-b-2 font-bold"
              : "text-neutral9 dark:text-white hover:text-primary dark:hover:text-primary-dark"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
