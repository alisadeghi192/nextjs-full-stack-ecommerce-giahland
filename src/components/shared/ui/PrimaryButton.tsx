"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  href,
  onClick,
  disabled,
  className = "",
}: PrimaryButtonProps) {
  const baseClasses =
    "bg-primary dark:bg-primary-dark dark:text-shade4 text-white hover:bg-shade2 dark:hover:bg-primary rounded-xl transition-colors cursor-pointer flex items-center justify-center";
    const disabledClasses = "bg-neutral7! cursor-default!";

  const combinedClassName = `${baseClasses} ${disabled ? disabledClasses : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={combinedClassName} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button type="submit" className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
}