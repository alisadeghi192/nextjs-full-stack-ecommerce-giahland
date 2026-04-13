import { ReactNode } from "react";
import PublicHeader from "@/components/layout/public/PublicHeader";
import Footer from "@/components/layout/public/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      {children}
      <Footer />
    </>
  );
}