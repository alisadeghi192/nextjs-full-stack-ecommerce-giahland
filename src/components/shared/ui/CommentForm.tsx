"use client";

import FormField from "@/components/shared/ui/FormField";
import TextareaField from "@/components/shared/ui/TextareaField";
import { MdDriveFileRenameOutline } from "react-icons/md";
import PrimaryButton from "./PrimaryButton";

export default function CommentForm() {
  return (
    <div className="border-neutral3 mb-4 flex flex-col space-y-4 rounded-xl border p-6">
      <h3 className="font-bold">دیدگاه خود را ثبت کنید.</h3>
      <form className="space-y-4">
        <div className="flex items-center justify-between gap-x-4 gap-y-4 *:w-full max-[576px]:flex-col">
          <FormField
            icon={<MdDriveFileRenameOutline size={22} />}
            type="text"
            name="comment-name"
            label="نام و نام خانوادگی"
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={22} />}
            type="email"
            name="comment-email"
            label="ایمیل"
          />
        </div>
        <TextareaField
          icon={<MdDriveFileRenameOutline size={22} />}
          name="comment-text"
          label="متن دیدگاه"
          rows={3}
        />
        <PrimaryButton className="max-xs:w-full h-10 w-47 justify-self-end rounded-lg!">
          ارسال
        </PrimaryButton>
      </form>
    </div>
  );
}
