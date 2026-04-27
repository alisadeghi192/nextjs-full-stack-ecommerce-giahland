"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function PrimaryButton({
  children,
  href,
  className = "",
}: PrimaryButtonProps) {
  const baseClasses =
    "bg-primary text-white hover:bg-shade2 rounded-xl transition-colors cursor-pointer flex items-center justify-center"; // ✅ flex

  const combinedClassName = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="submit" className={combinedClassName}>
      {children}
    </button>
  );
}