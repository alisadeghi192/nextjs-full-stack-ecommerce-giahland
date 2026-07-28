"use server";

import { THEME_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";

export async function setThemeCookieAction(theme: "light" | "dark") {
  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE_NAME, theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false, 
  });
}