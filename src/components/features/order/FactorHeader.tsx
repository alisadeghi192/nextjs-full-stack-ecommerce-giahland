"use client"
import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";


export default function FactorHeader() {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle title="جزئیات سفارش" className="mb-0!" />
      <BackButton/>
    </div>
  );
}
