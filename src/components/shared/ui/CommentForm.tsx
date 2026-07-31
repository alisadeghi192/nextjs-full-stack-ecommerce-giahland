"use client";

import FormField from "@/components/shared/ui/FormField";
import TextareaField from "@/components/shared/ui/TextareaField";
import {
    useIsAuthenticated,
    useUserEmail,
    useUserFirstName,
    useUserLastName,
} from "@/features/auth/selectors/auth.selectors";
import { createCommentAction } from "@/features/comments/actions/createComment.actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdDriveFileRenameOutline } from "react-icons/md";
import PrimaryButton from "./PrimaryButton";

interface CommentFormProps {
  targetType: "products" | "blog";
  targetId: string;
  targetSlug: string;
  targetCategory: string;
}

export default function CommentForm({
  targetType,
  targetId,
  targetSlug,
  targetCategory,
} : CommentFormProps) {
  const isAuthenticated = useIsAuthenticated();
  const userFirstName = useUserFirstName() || "";
  const userLastName = useUserLastName() || "";
  const userEmail = useUserEmail() || "";
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
       toast.success(state.message ?? "کامنت با موفقیت ثبت شد.");
    } else if (state?.errors) {
      const firstError = Object.values(state.errors).flat()[0];
      if (firstError) {
        toast.error(firstError );
      }
    }
  }, [state]);

  const fullName = `${userFirstName} ${userLastName}`.trim();
  return (
    <div
      id="comments"
      className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 shadow-xl mt-6 mb-4 flex scroll-mt-25.5 flex-col space-y-4 rounded-xl border p-6 max-md:scroll-mt-35 max-sm:scroll-mt-35"
    >
      <h3 className="font-bold">دیدگاه خود را ثبت کنید.</h3>
      <form className="space-y-4" noValidate action={formAction}>
        <input type="hidden" name="targetType" value={targetType} />
        <input type="hidden" name="targetId" value={targetId} />
        <input type="hidden" name="targetSlug" value={targetSlug} />
        <input type="hidden" name="targetCategory" value={targetCategory} />
        <div className="flex items-center justify-between gap-x-4 gap-y-4 *:w-full max-[576px]:flex-col">
          <FormField
            icon={<MdDriveFileRenameOutline size={22} />}
            type="text"
            id="name"
            name="name"
            label="نام و نام خانوادگی"
            defaultValue={isAuthenticated ? fullName : ""}
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={22} />}
            type="email"
            name="email"
            id="email"
            label="ایمیل"
            defaultValue={isAuthenticated ? userEmail : ""}
          />
        </div>
        <TextareaField
          icon={<MdDriveFileRenameOutline size={22} />}
          name="text"
          id="text"
          label="متن دیدگاه"
          rows={3}
        />
        <PrimaryButton
          className="max-xs:w-full h-10 w-47 justify-self-end rounded-lg!"
          disabled={isPending}
        >
          {isPending ? "در حال ارسال..." : "ارسال"}
        </PrimaryButton>
      </form>
    </div>
  );
}
