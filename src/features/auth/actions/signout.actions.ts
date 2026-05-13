"use server";

import { deleteAuthCookies } from "@/lib/auth/auth.helpers";
import { redirect } from "next/navigation";

export async function signoutAction(): Promise<{ success: boolean }> {
  await deleteAuthCookies();
  
  redirect("/");
}