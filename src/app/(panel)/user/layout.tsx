import PanelLayout from "@/components/panel/PanelLayout";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { DOCTOR_PANEL_LINKS, USER_PANEL_LINKS } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getMeAction();

  if (!user || (user.role !== "user" && user.role !== "plant-doctor")) {
    redirect("/login-register");
  }

  const links = user.role === "plant-doctor" ? DOCTOR_PANEL_LINKS : USER_PANEL_LINKS;

  return <PanelLayout links={links}>{children}</PanelLayout>;
}