import PanelLayout from "@/components/panel/PanelLayout";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { ADMIN_PANEL_LINKS } from "@/lib/constants";
import { redirect } from "next/navigation";

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