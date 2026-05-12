"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: IRegisterInput) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formAction(formData);
  };

  return (
    <RegisterForm
      onToggle={onToggle}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      serverError={state?.success === false ? state.message : undefined}
      serverSuccess={state?.success === true ? state.message : undefined}
    />
  );
}
