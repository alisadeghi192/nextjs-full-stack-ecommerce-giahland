"use client";
import PasswordField from "@/components/shared/ui/PasswordField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg">
      <form>
        <div className="grid grid-cols-2 gap-4 [&>*:first-child]:col-span-2">
          <PasswordField
            id="oldPassword"
            label="رمز عبور فعلی"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <PasswordField
            id="newPassword"
            label="رمز عبور جدید"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordField
            id="confirmNewPassword"
            label="تکرار رمز عبور جدید"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <PrimaryButton className="mt-4 mr-auto h-12 w-43 text-lg">ذخیره</PrimaryButton>
      </form>
    </div>
  );
}