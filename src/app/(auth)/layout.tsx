import { AUTH_METADATA } from "@/lib/constants/metadata";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: AUTH_METADATA.title,
  description: AUTH_METADATA.description,
  robots: AUTH_METADATA.robots,
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
