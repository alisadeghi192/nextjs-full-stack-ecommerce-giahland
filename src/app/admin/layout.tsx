import PanelLayout from "@/components/panel/PanelLayout";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { ADMIN_PANEL_LINKS, PANEL_METADATA } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: PANEL_METADATA.admin.title,
  description: PANEL_METADATA.admin.description,
  robots: PANEL_METADATA.admin.robots,
};


export default async function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return <PanelLayout links={ADMIN_PANEL_LINKS} isAdmin={true}>{children}</PanelLayout>;
}