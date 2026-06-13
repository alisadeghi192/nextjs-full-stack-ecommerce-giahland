import PanelLayout from "@/components/panel/PanelLayout";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { plantDoctorLinks, userLinks } from "@/lib/constants/panelLinks";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getMeAction();

  if (!user || (user.role !== "user" && user.role !== "plant-doctor")) {
    redirect("/login-register");
  }

  const links = user.role === "plant-doctor" ? plantDoctorLinks : userLinks;

  return <PanelLayout links={links}>{children}</PanelLayout>;
}