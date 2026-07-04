"use client";

import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import { ConsultationMessageWithDetails } from "@/features/consultations/types/consultation.types";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface ChatMessagesProps {
  initialMessages: ConsultationMessageWithDetails[];
  isLoading?: boolean;
}

export default function ChatMessages({
  initialMessages,
  isLoading,
}: ChatMessagesProps) {
  const { refresh } = useNotifications();
  useEffect(() => {
    refresh();
  }, []);
  const userRole = useUserRole();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDoctor = userRole === "plant-doctor";
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const allImages = initialMessages
    .filter((msg) => msg.image)
    .map((msg) => ({ src: msg.image! }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [initialMessages]);

  useEffect(() => {
    if (!isLoading && initialMessages.length > 0) {
      const timer = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, initialMessages]);

  if (initialMessages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center overflow-y-auto">
        <div className="border-neutral9 fixed top-45/100 rounded-2xl border bg-white p-10">
          <p className="text-neutral11 text-center">
            هنوز پیامی ارسال نشده؛
            <br />
            اولین پیام را شما ارسال کنید.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || showSkeleton) {
    return (
      <div className="flex-1 space-y-3 overflow-y-auto px-4 pt-8 pb-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-6/10 rounded-2xl px-4 py-3 ${
                i % 2 === 0 ? "bg-neutral2" : "bg-[#E3F7EA]"
              }`}
            >
              <div className="h-4 w-48 animate-pulse rounded bg-gray-300" />
              <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="custom-scroll ltr flex-1 space-y-3 overflow-y-auto px-4 pt-8 pb-5">
      {initialMessages.map((message) => {
        const isMyMessage = message.sender === (isDoctor ? "doctor" : "user");

        return (
          <div
            key={message._id}
            className={`rtl flex ${isMyMessage ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`text-neutral10 border-neutral9 max-w-6/10 rounded-2xl border px-4 py-2 max-lg:max-w-8/10 ${
                isMyMessage
                  ? "bg-neutral2 rounded-br-none"
                  : "rounded-bl-none bg-[#E3F7EA]"
              }`}
            >
              {message.image && (
                <div
                  className="relative mb-2 size-48 cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => {
                    const index = allImages.findIndex(
                      (img) => img.src === message.image,
                    );
                    setLightboxIndex(index >= 0 ? index : 0);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={message.image}
                    alt="attachment"
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}

              {message.text && (
                <p className="max-x-full text-lg whitespace-pre-wrap max-lg:text-base">
                  {message.text}
                </p>
              )}

              <div
                className={`text-primary mt-1 flex items-center gap-1 text-xs font-medium ${isMyMessage ? "justify-start" : "justify-end"}`}
              >
                {isMyMessage && (
                  <>
                    {message.status === "seen" && (
                      <span>
                        <IoCheckmarkDoneSharp className="size-3.5" />{" "}
                      </span>
                    )}
                    {message.status === "sent" && (
                      <span>
                        <IoCheckmarkSharp className="size-3.5" />
                      </span>
                    )}
                  </>
                )}
                <span>
                  {new Date(message.createdAt).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={allImages}
        index={lightboxIndex}
        controller={{closeOnBackdropClick : true}}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
        }}
      />
    </div>
  );
}
