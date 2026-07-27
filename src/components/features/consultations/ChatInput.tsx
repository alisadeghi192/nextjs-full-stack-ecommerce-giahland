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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("consultationId", consultationId);
    formData.append("text", message);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const result = await sendMessage(formData);
    if (result.success) {
      setMessage("");
      setSelectedImage(null);
      setImagePreview(null);
    } else {
      toast.error(result.message || "خطا در ارسال پیام");
    }
    setIsLoading(false);
  };

  return (
    <div className="sticky bottom-3 mx-auto w-9/10">
      {isChatClosed ? (
        <div className="border-error text-error flex h-12 items-center justify-center rounded-full border bg-white">
          <span className="text-lg max-sm:text-base">
            {username} عزیز این مشاوره پایان یافته.
          </span>
        </div>
      ) : (
        <>
          {imagePreview && (
            <div className="absolute bottom-12 left-0 mb-2 rounded-lg border bg-white p-2">
              <img
                src={imagePreview}
                alt="preview"
                className="h-20 w-20 rounded object-cover"
              />
              <button
                onClick={removeImage}
                className="border-error hover:bg-bg-error mt-1 block w-full cursor-pointer rounded-lg border text-xs text-red-500"
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
              disabled={isLoading || (!message.trim() && !selectedImage)}
              className="flex h-12 shrink-0 items-center justify-center gap-x-1 rounded-full! p-2 text-white transition-colors max-md:size-12 max-md:p-0"
            >
              <span className="max-md:hidden">ارسال</span>
              <MdSend className="size-5 rotate-180" />
            </PrimaryButton>
            <div className="flex-1">
              <div className="border-neutral6 focus-within:border-primary relative flex min-h-12 items-center rounded-full border bg-white/40 px-3.75 backdrop-blur-lg transition-colors duration-200">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  className="placeholder:text-neutral10 text-neutral11 custom-scroll h-auto max-h-20 w-full resize-none overflow-y-auto py-2 outline-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <label className="hover:bg-neutral3 border-neutral5 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-white">
              <ImAttachment className="text-primary size-6" />
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
