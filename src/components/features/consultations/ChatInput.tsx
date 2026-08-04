"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { sendMessage } from "@/features/consultations/actions/sendMessage.actions";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

interface ChatInputProps {
  consultationId: string;
  consultationStatus: string;
  username: string;
}

export default function ChatInput({
  consultationId,
  consultationStatus,
  username,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isChatClosed = consultationStatus === "closed";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم عکس نباید بیشتر از ۵ مگابایت باشد.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("فایل انتخابی یک تصویر معتبر نیست.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImageBase64(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImageBase64(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedImageBase64) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("consultationId", consultationId);
    formData.append("text", message);
    if (selectedImageBase64) {
      formData.append("imageBase64", selectedImageBase64);
    }

    const result = await sendMessage(formData);
    if (result.success) {
      setMessage("");
      setSelectedImageBase64(null);
      setImagePreview(null);
    } else {
      toast.error(result.message || "خطا در ارسال پیام");
    }
    setIsLoading(false);
  };

  return (
    <div className="sticky bottom-3 mx-auto w-9/10">
      {isChatClosed ? (
        <div className="border-error text-red-500 dark:text-gray-50 flex h-12 items-center justify-center backdrop-blur-lg rounded-full border bg-white/30 dark:bg-primary/50">
          <span className="text-lg max-sm:text-base ">
            {username} عزیز این مشاوره پایان یافته.
          </span>
        </div>
      ) : (
        <>
          {imagePreview && (
            <div className="absolute bottom-12 dark:border-neutral10 left-0 mb-2 rounded-lg border bg-white dark:bg-shade2 p-2">
              <img
                src={imagePreview}
                alt="preview"
                className="h-20 w-20 rounded object-cover"
              />
              <button
                onClick={removeImage}
                className="border-error hover:bg-bg-error dark:bg-error dark:text-white dark:hover:text-error dark:hover:bg-white mt-1 block w-full cursor-pointer rounded-lg border text-xs text-red-500"
              >
                حذف
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 max-sm:gap-1"
          >
            <PrimaryButton
              disabled={isLoading || (!message.trim() && !selectedImageBase64)}
              className="flex h-12 shrink-0 items-center justify-center gap-x-1 rounded-full! p-2 text-white transition-colors max-md:size-12 max-md:p-0"
            >
              <span className="max-md:hidden">ارسال</span>
              <MdSend className="size-5 rotate-180" />
            </PrimaryButton>
            <div className="flex-1">
              <div className="border-neutral6 dark:border-neutral10 dark:focus-within:border-primary-dark focus-within:border-primary dark:bg-primary/10 relative flex min-h-12 items-center rounded-full border bg-white/40 px-3.75 backdrop-blur-lg transition-colors duration-200">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  className="placeholder:text-neutral10 dark:placeholder:text-neutral5 text-neutral11 dark:text-white custom-scroll h-auto max-h-20 w-full resize-none overflow-y-auto py-2 outline-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <label className="hover:bg-neutral3 dark:hover:bg-shade2 border-neutral5 dark:border-neutral10 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-white dark:bg-primary ">
              <ImAttachment className="text-primary dark:text-white size-6" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </form>
        </>
      )}
    </div>
  );
}