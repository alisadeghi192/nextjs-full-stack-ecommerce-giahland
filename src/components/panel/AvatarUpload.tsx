"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import {
  useUserAvatar,
  useUserFirstName,
  useCheckAuth,
} from "@/features/auth/selectors/auth.selectors";
import { uploadAvatarAction } from "@/features/user/actions/uploadAvatar.actions";
import { deleteAvatarAction } from "@/features/user/actions/deleteAvatar.actions";
import toast from "react-hot-toast";

export default function AvatarUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const userAvatar = useUserAvatar() || "/static/images/default-user.jpg";
  const isDefaultAvatar = userAvatar === "/static/images/default-user.jpg";
  const firstName = useUserFirstName() || "";
  const checkAuth = useCheckAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const handleDelete = () => {
    if (isDeleteConfirmOpen) {
      return;
    }
    setIsDeleteConfirmOpen(true);
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">آیا از حذف عکس پروفایل مطمئن هستید؟</p>
          <div className="mt-3 flex justify-start gap-4">
            <button
              onClick={() => {
                confirmDelete();
                toast.dismiss(t.id);
                setIsDeleteConfirmOpen(false);
              }}
              className="bg-error cursor-pointer rounded-lg px-3 py-1 text-white"
            >
              حذف
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setIsDeleteConfirmOpen(false);
              }}
              className="bg-neutral3 cursor-pointer rounded-lg px-3 py-1"
            >
              انصراف
            </button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <div className="size-20 overflow-hidden rounded-full">
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
      <button
        onClick={handleDelete}
        disabled={isLoading || isDefaultAvatar}
        className="text-error flex size-9 cursor-pointer items-center justify-center rounded-lg border transition-colors hover:bg-red-50 disabled:opacity-50 disabled:cursor-default"
      >
        <TbTrash className="size-6" />
      </button>

    </div>
  );
}
