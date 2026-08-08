"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface NavigationProgressContextType {
  isNavigating: boolean;
}

const NavigationProgressContext =
  createContext<NavigationProgressContextType>({
    isNavigating: false,
  });

export default function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;

      const target = event.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;

      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      if (
        link.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const nextUrl = new URL(href, window.location.origin);

      const currentUrl =
        window.location.pathname + window.location.search;

      const nextPath = nextUrl.pathname + nextUrl.search;

      if (currentUrl === nextPath) return;

      setIsNavigating(true);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <NavigationProgressContext.Provider value={{ isNavigating }}>
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  return useContext(NavigationProgressContext);
}