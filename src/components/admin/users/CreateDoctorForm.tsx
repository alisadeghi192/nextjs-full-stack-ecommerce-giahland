"use client";

import FormField from "@/components/shared/ui/FormField";
import PasswordField from "@/components/shared/ui/PasswordField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { createDoctor } from "@/features/user/actions/createDoctor.actions";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";

export default function CreateDoctorForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialties: "",
    yearsOfExperience: "",
    consultationFee: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    startTransition(async () => {
      const result = await createDoctor(fd);

      if (result.success && result.message) {
        toast.success(result.message);
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
          specialties: "",
          yearsOfExperience: "",
          consultationFee: "",
        });
      } else if (result.errors) {
        const firstError = Object.values(result.errors).flat()[0];
        if (firstError) toast.error(firstError);
      } else if (result.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="border-neutral3 rounded-2xl border bg-white p-6 shadow-lg max-md:p-4">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="firstName"
            name="firstName"
            label="نام"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
          <FormField
            icon={<IoPhonePortraitOutline size={20} />}
            id="mobile"
            name="mobile"
            label="شماره موبایل"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
          />
          <FormField
            icon={<MdAlternateEmail size={20} />}
            id="email"
            name="email"
            label="ایمیل"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordField
            id="password"
            name="password"
            label="رمز عبور"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="تکرار رمز عبور"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 lg:col-span-2">
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="specialties"
              name="specialties"
              label="تخصص"
              type="text"
              value={formData.specialties}
              onChange={handleChange}
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="yearsOfExperience"
              name="yearsOfExperience"
              label="سال‌های تجربه"
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="consultationFee"
              name="consultationFee"
              label="هزینه مشاوره (تومان)"
              type="number"
              value={formData.consultationFee}
              onChange={handleChange}
            />
          </div>
        </div>

        <PrimaryButton
          disabled={isPending}
          className="mt-2 mr-auto h-12 w-43 text-lg max-md:w-full"
        >
          {isPending ? "در حال ثبت..." : "ثبت پزشک"}
        </PrimaryButton>
      </form>
    </div>
  );
}