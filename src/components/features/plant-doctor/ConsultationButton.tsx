"use client";

import OutlineButton from "@/components/shared/ui/OutlineButton";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
    useIsAuthenticated,
    useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface ConsultationButtonProps {
  variant?: "primary" | "outline";
  children: ReactNode;
  className?: string;
}

export default function ConsultationButton({
  variant = "primary",
  children,
  className,
}: ConsultationButtonProps) {
  const isAuthenticated = useIsAuthenticated();
  const role = useUserRole();
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("برای مشاوره ابتدا باید ورود یا ثبت نام کنید.");
    } else if (role === "user") {
      router.push("/user/consultations");
    } else if (role === "plant-doctor") {
      router.push("/user/consultations/list");
    } else {
      return;
    }
  };

  if (variant === "outline") {
    return (
      <OutlineButton onClick={handleClick} className={className}>
        {children}
      </OutlineButton>
    );
  }

  return (
    <PrimaryButton onClick={handleClick} className={className}>
      {children}
    </PrimaryButton>
  );
}
