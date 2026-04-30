"use client";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailTabsProps {
  tabs: { id: string; label: string }[];
}

export default function ProductDetailTabs({ tabs }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="border-neutral5 sticky top-15 max-md:top-26.5 max-sm:top-24.5 flex w-full items-center border-b bg-white">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`#${tab.id}`}
          onClick={() => setActiveTab(tab.id)}
          className={`border-neutral5 z-20 basis-44.5 cursor-pointer py-2 text-center text-lg/6 transition-all ${
            activeTab === tab.id
              ? "text-primary border-primary border-b-2 leading-6 font-bold"
              : "text-neutral9 hover:text-primary"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
