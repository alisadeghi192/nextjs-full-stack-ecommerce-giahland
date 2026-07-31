"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSignpost } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import {
    MdDriveFileRenameOutline,
    MdKeyboardArrowDown,
    MdOutlineMobileFriendly,
} from "react-icons/md";

import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
    UserInfoCourierSchema,
    UserInfoFormData,
    UserInfoPickupSchema,
} from "@/features/order/schemas/order.schema";

interface CheckoutUserInfoProps {
  userInfo: {
    firstName: string;
    lastName: string;
    mobile: string;
    postalCode: string;
    address: string;
  };
  setUserInfo: (info: any) => void;
  onConfirm: () => void;
  onChange: () => void;
  deliveryMethod: "pickup" | "courier" | null;
}

export default function CheckoutUserInfo({
  userInfo,
  setUserInfo,
  onConfirm,
  onChange,
  deliveryMethod,
}: CheckoutUserInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const schema = useMemo(() => {
    if (deliveryMethod === "courier") {
      return UserInfoCourierSchema;
    }
    return UserInfoPickupSchema;
  }, [deliveryMethod]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(schema),
    defaultValues: userInfo,
    mode: "onChange",
  });

  useEffect(() => {
    reset(userInfo);
    setIsConfirmed(false);
  }, [deliveryMethod, reset, userInfo]);

  useEffect(() => {
    if (isConfirmed && isDirty) {
      setIsConfirmed(false);
      onChange();
    }
  }, [isDirty, isConfirmed, onChange]);

  const handleConfirm = (data: UserInfoFormData) => {
    setUserInfo(data);
    reset(data);
    setTimeout(() => {
      setIsConfirmed(true);
      onConfirm();
    }, 0);
  };

  const isButtonDisabled = !isValid || (isConfirmed && !isDirty);
  const isCourier = deliveryMethod === "courier";

  return (
    <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg max-md:text-base">مشخصات و آدرس</span>
          {isConfirmed ? (
            <span className="text-primary dark:text-primary-dark text-sm">✓ تایید شد</span>
          ) : (
            <span className="text-error text-sm">تایید نشده</span>
          )}
        </div>
        <MdKeyboardArrowDown
          className={`text-primary dark:text-primary-dark size-6 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <form onSubmit={handleSubmit(handleConfirm)} noValidate>
            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id="firstName"
                label="نام"
                type="text"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id="lastName"
                label="نام خانوادگی"
                type="text"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
              <FormField
                icon={<MdOutlineMobileFriendly size={20} />}
                id="mobile"
                label="شماره موبایل"
                type="text"
                error={errors.mobile?.message}
                {...register("mobile")}
              />

              <FormField
                icon={<BsSignpost size={20} />}
                id="postalCode"
                label={isCourier ? "کد پستی (اجباری)" : "کد پستی (اختیاری)"}
                type="text"
                error={errors.postalCode?.message}
                {...register("postalCode")}
              />

              <div className="md:col-span-2">
                <FormField
                  icon={<GoHome size={20} />}
                  id="address"
                  label={isCourier ? "آدرس (اجباری)" : "آدرس (اختیاری)"}
                  type="text"
                  error={errors.address?.message}
                  {...register("address")}
                />
              </div>
            </div>

            <PrimaryButton
              disabled={isButtonDisabled}
              className="mt-4 mr-auto h-10 w-full md:w-40"
            >
              {isConfirmed && !isDirty ? "✓ تایید شد" : "تایید مشخصات"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}