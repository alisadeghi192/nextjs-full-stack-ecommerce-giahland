import { redirect } from "next/navigation";
import { getMeAction } from "@/features/auth/actions/me.actions";
import PanelLayout from "@/components/panel/PanelLayout";
import { userLinks } from "@/lib/constants/panelLinks";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getMeAction();

  if (!user || user.role !== "user") {
    redirect("/login-register");
  }

  return <PanelLayout links={userLinks}>{children}</PanelLayout>;
}