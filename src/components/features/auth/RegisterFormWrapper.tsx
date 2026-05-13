"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import RegisterForm from "./RegisterForm";
import { signupAction } from "@/features/auth/actions/signup.actions";
import {
  RegisterSchema,
  IRegisterInput,
} from "@/features/auth/schemas/auth.schema";

interface RegisterFormWrapperProps {
  onToggle: () => void;
}

export default function RegisterFormWrapper({
  onToggle,
}: RegisterFormWrapperProps) {
  const [state, formAction] = useActionState(signupAction, null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: validateForm,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IRegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const isLoading = isSubmitting || isPending;

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "ثبت‌نام با موفقیت انجام شد " , {position : "top-left" ,style:{maxWidth: "fit-content" ,  boxShadow: 'shadow-lg'}});
      reset();
    } else if (state?.success === false && state?.message) {
      toast.error(state.message , {position : "top-left" ,style:{maxWidth: "fit-content" ,  boxShadow: 'shadow-lg'}});
    }
  }, [state, reset]);

  const sendDataToServer = (data: IRegisterInput) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <RegisterForm
      onToggle={onToggle}
      register={register}
      errors={errors}
      isSubmitting={isLoading}
      onSubmit={validateForm(sendDataToServer)}
    />
  );
}
