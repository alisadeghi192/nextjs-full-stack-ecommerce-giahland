"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import BackButton from "@/components/shared/ui/BackButton";

export default function UserDetailHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-x-2">
        <SectionTitle title="مشخصات کاربر" className="mb-0!" />
      </div>
      <BackButton />
    </div>
  );
}
