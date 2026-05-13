"use client";

import { useActionState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm";
import { signinAction } from "@/features/auth/actions/signin.actions";
import { LoginSchema, ILoginInput } from "@/features/auth/schemas/auth.schema";

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
      toast.success(state.message || "ورود با موفقیت انجام شد");
      reset();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else if (state?.success === false && state?.message) {
      toast.error(state.message);
    }
  }, [state, reset, router]);

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