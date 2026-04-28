"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
}: PrimaryButtonProps) {
  const baseClasses =
    "bg-primary text-white hover:bg-shade2 rounded-xl transition-colors cursor-pointer flex items-center justify-center";

  const combinedClassName = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={combinedClassName}>
        {children}
      </button>
    );
  }

  return (
    <button type="submit" className={combinedClassName}>
      {children}
    </button>
  );
}