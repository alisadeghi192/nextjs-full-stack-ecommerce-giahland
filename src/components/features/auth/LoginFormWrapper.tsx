"use client";

import { signinAction } from "@/features/auth/actions/signin.actions";
import { ILoginInput, LoginSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm";

interface LoginFormWrapperProps {
  onToggle: () => void;
}

export default function LoginFormWrapper({ onToggle }: LoginFormWrapperProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(signinAction, null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: validateForm,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const isLoading = isSubmitting || isPending;

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "ورود با موفقیت انجام شد", {
        position: "top-left",
        style: { maxWidth: "fit-content", boxShadow: "shadow-lg" },
      });
      reset();
      router.push("/");
    } else if (state?.success === false && state?.message) {
      toast.error(state.message, {
        position: "top-left",
        style: { maxWidth: "fit-content", boxShadow: "shadow-lg" },
      });
    }
  }, [state, reset]);

  const sendDataToServer = (data: ILoginInput) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <LoginForm
      onToggle={onToggle}
      register={register}
      errors={errors}
      isSubmitting={isLoading}
      onSubmit={validateForm(sendDataToServer)}
    />
  );
}
