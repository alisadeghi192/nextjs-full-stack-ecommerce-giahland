import { setThemeCookieAction } from "@/features/theme/actions/setThemeCookieAction";
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isLoading: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  isLoading: true,
  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    set({ theme: newTheme });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    setThemeCookieAction(newTheme);
    localStorage.setItem("theme", newTheme);
  },
  setTheme: (theme) => set({ theme }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
