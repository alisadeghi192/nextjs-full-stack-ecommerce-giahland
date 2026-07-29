"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function OutlineButton({
  children,
  href,
  onClick,
  className = "",
}: OutlineButtonProps) {
  const baseClasses =
    "border border-primary dark:border-primary-dark hover:text-primary dark:hover:text-primary hover:border-shade2 transition-colors cursor-pointer rounded-xl flex items-center justify-center text-primary dark:text-primary-dark";

  const combinedClassName = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
