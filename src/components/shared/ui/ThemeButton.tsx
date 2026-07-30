"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeButton() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isLoading = useThemeStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="border-primary group flex size-8 animate-pulse cursor-wait items-center justify-center rounded-lg border bg-neutral3 dark:bg-shade3 sm:size-10 sm:rounded-xl lg:size-12">
        <div className="bg-neutral5 size-5 dark:bg-shade4 rounded-full"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`border-primary dark:border-primary-dark hover:border-shade2 dark:hover:border-primary group flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors sm:size-10 sm:rounded-xl lg:size-12`}
    >
      <span className="text-primary dark:text-primary-dark dark:group-hover:text-primary group-hover:text-shade2 transition-colors">
        {theme === "dark" ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
      </span>
    </button>
  );
}