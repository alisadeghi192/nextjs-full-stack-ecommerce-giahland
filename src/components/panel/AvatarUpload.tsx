"use client";
import {
  useCheckAuth,
  useUserAvatar,
  useUserFirstName,
} from "@/features/auth/selectors/auth.selectors";
import { deleteAvatarAction } from "@/features/user/actions/deleteAvatar.actions";
import { uploadAvatarAction } from "@/features/user/actions/uploadAvatar.actions";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbEdit, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ui/ConfirmDialog";

export default function AvatarUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const userAvatar = useUserAvatar() || "/static/images/default-user.webp";
  const isDefaultAvatar = userAvatar === "/static/images/default-user.webp";
  const firstName = useUserFirstName() || "";
  const checkAuth = useCheckAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("حجم عکس نباید بیشتر از ۴ مگابایت باشد.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    const result = await uploadAvatarAction(formData);
    if (result.success) {
      toast.success(result.message);
      checkAuth();
    } else {
      toast.error(result.message || "خطا در آپلود");
    }
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    const result = await deleteAvatarAction();
    if (result.success) {
      toast.success(result.message);
      checkAuth();
    } else {
      toast.error("خطا در حذف عکس");
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <div className="size-20 overflow-hidden rounded-full max-md:size-15">
        <Image
          alt={firstName || "user profile"}
          src={userAvatar}
          width={80}
          height={80}
          className="size-full object-cover object-center"
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <button
        onClick={handleEdit}
        disabled={isLoading}
        className="flex size-9 cursor-pointer items-center justify-center rounded-lg border text-[#00BBFF] transition-colors hover:bg-blue-50 disabled:opacity-50"
      >
        <TbEdit className="size-6" />
      </button>
      <ConfirmDialog
        onConfirm={confirmDelete}
        disabled={isLoading || isDefaultAvatar}
        title="آیا از حذف عکس پروفایل مطمئن هستید؟"
        confirmText="بله، حذف شود"
        cancelText="انصراف"
        className="text-error flex size-9 cursor-pointer items-center justify-center rounded-lg border transition-colors hover:bg-red-50 disabled:cursor-default disabled:opacity-50"
      >
        <TbTrash className="size-6" />
      </ConfirmDialog>
    </div>
  );
}
