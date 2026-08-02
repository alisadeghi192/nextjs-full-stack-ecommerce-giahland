"use client";

import { useThemeStore } from "@/stores/useThemeStore";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: theme === "dark" ? "var(--color-primary)" : "#fff",
          color: theme === "dark" ? "#fff" : "var(--color-shade2)",
          border: theme === "dark" ? "1px solid var(--color-neutral10)" : "1px solid #000",
          boxShadow: theme === "dark" 
            ? "0 4px 12px rgba(0,0,0,0.4)" 
            : "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          style: {
            background: theme === "dark" ? "var(--color-primary)" : "#f0fdf4",
            color: theme === "dark" ? "#fff" : "var(--color-shade2)",
            border: theme === "dark" ? "1px solid var(--color-neutral10)" : "1px solid #05df72",
          },
        },
        error: {
          style: {
            background: theme === "dark" ? "#331a1a" : "#fef2f2",
            color: theme === "dark" ? "#fca5a5" : "#991b1b",
            border: theme === "dark" ? "1px solid #6b2e2e" : "1px solid #fecaca",
          },
        },
      }}
    />
  );
}