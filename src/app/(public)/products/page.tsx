'use client'
import React, { useState } from "react";
import Breadcrumb from "@@/components/shared/ui/Breadcrumb";

function page() {
  interface productsTab {
    id: string;
    label: string;
  }
  const tabs: productsTab[] = [
    { id: "indoor", label: "گیاهان آپارتمانی" },
    { id: "decoration", label: "گیاهان تزئینی" },
    { id: "gift", label: "گیاهان کادویی" },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div>
          <div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`text-neutral9 border-neutral5 cursor-pointer border-b p-3 text-2xl/6 font-normal transition-all ${activeTab === tab.id ? 'font-bold! text-primary! border-b-2! border-primary!' : ''}`}
                onClick={()=> handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
