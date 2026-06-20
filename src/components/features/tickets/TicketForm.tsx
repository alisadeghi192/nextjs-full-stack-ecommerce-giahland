"use client";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import TextareaField from "@/components/shared/ui/TextareaField";
import { createTicket } from "@/features/tickets/actions/ticket.actions";
import { TICKET_DEPARTMENTS } from "@/lib/constants";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImAttachment } from "react-icons/im";
import { MdDriveFileRenameOutline, MdKeyboardArrowDown } from "react-icons/md";

export default function TicketForm() {
  const [state, formAction, isPending] = useActionState(createTicket, null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
      setImagePreview(null);
    } else if (state?.success === false && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("حجم فایل نباید بیشتر از ۴ مگابایت باشد.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg max-md:p-3.5">
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="flex items-end gap-4 max-lg:flex-col max-lg:items-center">
          <div className="grid w-3/4 grid-cols-2 gap-3 max-lg:w-full max-lg:grid-cols-1 lg:[&>*:nth-child(3)]:col-span-2">
            <FormField
              icon={<MdDriveFileRenameOutline size={20} />}
              id="subject"
              name="subject"
              label="موضوع"
              type="text"
            />

            <div className="group border-neutral6 focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200 max-sm:h-12">
              <span className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200">
                <MdDriveFileRenameOutline size={20} />
              </span>
              <select
                required
                name="department"
                defaultValue=""
                id="department"
                className="peer text-neutral11 invalid:text-neutral9 flex-1 cursor-pointer appearance-none border-0 bg-transparent outline-0"
              >
                <option value="" disabled className="text-neutral9">
                  دپارتمان مورد نظر
                </option>
                {TICKET_DEPARTMENTS.map((department) => (
                  <option
                    key={department.value}
                    value={department.value}
                    className="text-neutral11 bg-white"
                  >
                    {department.label}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="text-primary pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 transition-colors duration-200" />
            </div>

            <TextareaField
              icon={<MdDriveFileRenameOutline size={20} />}
              label="پیام خود را بنویسید..."
              name="message"
              id="message"
              rows={2}
            />
            {imagePreview && (
              <div className=" rounded-lg border bg-white p-1 w-fit lg:hidden -my-1.5">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="size-20 rounded object-cover"
                />
                <button
                  onClick={removeImage}
                  className="border-error hover:bg-bg-error mt-1 block w-full cursor-pointer rounded-lg border text-xs text-red-500"
                >
                  حذف
                </button>
              </div>
            )}
          </div>

          <div className="relative flex w-1/4 items-center gap-x-4 max-lg:w-full">
            <input
              ref={fileInputRef}
              type="file"
              name="attachment"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={handleFileClick}
              disabled={isPending}
              className="border-neutral4 text-primary hover:border-primary relative flex h-12 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:opacity-50"
            >
              <ImAttachment className="size-6" />
            </button>
            {imagePreview && (
              <div className="absolute right-0 bottom-13.75 rounded-lg border bg-white p-1 max-lg:hidden">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="size-20 rounded object-cover"
                />
                <button
                  onClick={removeImage}
                  className="border-error hover:bg-bg-error mt-1 block w-full cursor-pointer rounded-lg border text-xs text-red-500"
                >
                  حذف
                </button>
              </div>
            )}
            <PrimaryButton disabled={isPending} className="h-12 w-full">
              {isPending ? "در حال ثبت..." : "ثبت"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
