import { redirect } from "next/navigation";
import { getMeAction } from "@/features/auth/actions/me.actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getMeAction();

  if (!user) {
    redirect("/login-register");
  }

  return <>{children}</>;
}