"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigationProgress } from "../../../providers/NavigationProgressProvider";

export default function NavigationProgress() {
  const { isNavigating } = useNavigationProgress();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isNavigating) {
      setVisible(true);
      setProgress(5);

      timerRef.current = setInterval(() => {
        setProgress((current) => {
          if (current >= 85) return 85;

          return current + (85 - current) * 0.04;
        });
      }, 100);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!visible) return;

    setProgress(100);

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isNavigating]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-full h-0.75 overflow-hidden">
      <div
        className="h-full bg-primary dark:bg-primary-dark transition-[width] duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}