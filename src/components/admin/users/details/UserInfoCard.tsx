"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { deleteUserAvatar } from "@/features/user/actions/deleteUserAvatar.actions";
import { toggleUserBlock } from "@/features/user/actions/toggleUserBlock.actions";
import { updateUserInfo } from "@/features/user/actions/updateUserInfo.actions";
import { roleConfig } from "@/lib/constants";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  MdBlock,
  MdCheckCircle,
  MdDeleteOutline,
  MdEdit,
} from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import EditUserModal from "./EditUserModal";
import UserInfoFields from "./UserInfoFields";

interface UserInfoCardProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    role: "admin" | "user" | "plant-doctor";
    avatar: string;
    createdAt: Date;
    isBlocked?: boolean;
    postalCode?: string;
    address?: string;
    specialties?: string;
    yearsOfExperience?: number;
    consultationFee?: number;
    successfulConsultations?: number;
  };
  isSuperAdmin?: boolean;
}

export default function UserInfoCard({
  user,
  isSuperAdmin = false,
}: UserInfoCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState(user.firstName || "");
  const [editLastName, setEditLastName] = useState(user.lastName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editSpecialties, setEditSpecialties] = useState(
    user.specialties || "",
  );
  const [editYearsOfExperience, setEditYearsOfExperience] = useState(
    user.yearsOfExperience?.toString() || "",
  );
  const [editConsultationFee, setEditConsultationFee] = useState(
    user.consultationFee?.toString() || "",
  );

  const displayName = `${user.firstName} ${user.lastName}`.trim() || "کاربر";

  const canBlock = user.role === "user";
  const canEdit = !isSuperAdmin;

  const isDefaultAvatar = user.avatar.includes("default-user.webp");
  const isSidebarOpen = useIsSidebarOpen();

  const handleDeleteAvatar = async () => {
    if (!canEdit) return;
    setIsLoading(true);
    const result = await deleteUserAvatar(user._id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleToggleBlock = async () => {
    if (!canBlock || !canEdit) return;
    setIsLoading(true);
    const result = await toggleUserBlock(user._id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleEdit = () => {
    setEditFirstName(user.firstName || "");
    setEditLastName(user.lastName || "");
    setEditSpecialties(user.specialties || "");
    setEditYearsOfExperience(user.yearsOfExperience?.toString() || "");
    setEditConsultationFee(user.consultationFee?.toString() || "");
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("firstName", editFirstName);
    formData.append("lastName", editLastName);
    formData.append("specialties", editSpecialties);
    formData.append("yearsOfExperience", editYearsOfExperience);
    formData.append("consultationFee", editConsultationFee);

    const result = await updateUserInfo(formData);
    if (result.success) {
      toast.success(result.message);
      setIsEditModalOpen(false);
    } else {
      toast.error(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div
        className={`border-neutral3 rounded-xl border bg-white p-4 pb-7 shadow-lg ${
          isSidebarOpen ? "max-lg:pb-4" : "max-sm:pb-4"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <SectionTitle title="اطلاعات شخصی" className="mb-0!" />
          <div className="flex items-center gap-x-2">
            <span
              className={`flex w-20 items-center justify-center rounded-full py-1 text-sm font-medium ${roleConfig[user.role].className}`}
            >
              {roleConfig[user.role].label}
            </span>
            {user.role === "user" && user.isBlocked && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                🔒 مسدود
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex items-start gap-6 ${
            isSidebarOpen
              ? "max-lg:flex-col max-lg:items-center max-lg:gap-4"
              : "max-sm:flex-col max-sm:items-center max-sm:gap-4"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div
              onClick={() => {
                if (!isDefaultAvatar) {
                  setIsLightboxOpen(true);
                }
              }}
              className={`relative flex size-35 shrink-0 flex-col overflow-hidden rounded-full ${
                !isDefaultAvatar
                  ? "ring-primary cursor-pointer ring-2 transition hover:ring-4"
                  : ""
              }`}
            >
              <Image
                src={user.avatar}
                alt={displayName}
                fill
                className="object-cover"
              />
              {!isDefaultAvatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition hover:opacity-100">
                  <span className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-700">
                    🔍 بزرگ‌نمایی
                  </span>
                </div>
              )}
            </div>
            {canEdit && !isDefaultAvatar && (
              <ConfirmDialog
                onConfirm={handleDeleteAvatar}
                title="آیا از حذف عکس پروفایل کاربر مطمئنید؟"
                cancelText="خیر"
                confirmText="بله"
                disabled={isLoading}
                className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-red-400 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 max-sm:hidden lg:hidden"
              >
                <MdDeleteOutline className="size-4" />
                حذف عکس
              </ConfirmDialog>
            )}
          </div>

          <div className="w-full flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{displayName}</h2>
              <div className="flex items-center gap-x-2">
                {canEdit && (
                  <button
                    onClick={handleEdit}
                    disabled={isLoading}
                    className={`flex cursor-pointer items-center gap-1 rounded-lg border border-blue-400 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50 ${
                      isSidebarOpen ? "max-lg:hidden" : "max-sm:hidden"
                    }`}
                  >
                    <MdEdit className="size-4" />
                    ویرایش
                  </button>
                )}
                {canEdit && !isDefaultAvatar && (
                  <ConfirmDialog
                    onConfirm={handleDeleteAvatar}
                    title="آیا از حذف عکس پروفایل کاربر مطمئنید؟"
                    cancelText="خیر"
                    confirmText="بله"
                    disabled={isLoading}
                    className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-red-400 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 max-lg:hidden"
                  >
                    <MdDeleteOutline className="size-4" />
                    حذف عکس
                  </ConfirmDialog>
                )}
                {canBlock && canEdit && (
                  <button
                    onClick={handleToggleBlock}
                    disabled={isLoading}
                    className={`flex cursor-pointer items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
                      isSidebarOpen ? "max-lg:hidden" : "max-sm:hidden"
                    } ${
                      user.isBlocked
                        ? "border-green-400 text-green-600 hover:bg-green-50"
                        : "border-red-400 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {user.isBlocked ? (
                      <>
                        <MdCheckCircle className="size-4" />
                        رفع مسدودیت
                      </>
                    ) : (
                      <>
                        <MdBlock className="size-4" />
                        مسدود کردن
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <UserInfoFields user={user} />

            <div
              className={`mt-2 flex items-center gap-2 ${
                isSidebarOpen ? "lg:hidden" : "sm:hidden"
              } mx-auto w-fit flex-wrap`}
            >
              {canEdit && (
                <button
                  onClick={handleEdit}
                  disabled={isLoading}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-blue-400 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                >
                  <MdEdit className="size-4" />
                  ویرایش
                </button>
              )}
              {canEdit && !isDefaultAvatar && (
                <ConfirmDialog
                  onConfirm={handleDeleteAvatar}
                  title="آیا از حذف عکس پروفایل کاربر مطمئنید؟"
                  cancelText="خیر"
                  confirmText="بله"
                  disabled={isLoading}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-red-400 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 sm:hidden"
                >
                  <MdDeleteOutline className="size-4" />
                  حذف عکس
                </ConfirmDialog>
              )}
              {canBlock && canEdit && (
                <button
                  onClick={handleToggleBlock}
                  disabled={isLoading}
                  className={`flex cursor-pointer items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
                    user.isBlocked
                      ? "border-green-400 text-green-600 hover:bg-green-50"
                      : "border-red-400 text-red-600 hover:bg-red-50"
                  }`}
                >
                  {user.isBlocked ? (
                    <>
                      <MdCheckCircle className="size-4" />
                      رفع مسدودیت
                    </>
                  ) : (
                    <>
                      <MdBlock className="size-4" />
                      مسدود کردن
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: user.avatar }]}
          controller={{ closeOnBackdropClick: true }}
          styles={{
            container: { backgroundColor: "rgba(0,0,0,0.9)" },
          }}
        />
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        isSubmitting={isSubmitting}
        role={user.role}
        firstName={editFirstName}
        lastName={editLastName}
        specialties={editSpecialties}
        yearsOfExperience={editYearsOfExperience}
        consultationFee={editConsultationFee}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        onFirstNameChange={setEditFirstName}
        onLastNameChange={setEditLastName}
        onSpecialtiesChange={setEditSpecialties}
        onYearsOfExperienceChange={setEditYearsOfExperience}
        onConsultationFeeChange={setEditConsultationFee}
      />
    </>
  );
}
