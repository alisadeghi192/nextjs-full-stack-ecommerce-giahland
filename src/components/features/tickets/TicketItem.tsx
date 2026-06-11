"use client";
import { ITicket } from "@/features/tickets/types/ticket.types";
import { TICKET_DEPARTMENTS } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface TicketItemProps {
  ticket: ITicket;
  isOpen: boolean;
  onToggle: () => void;
}

export default function TicketItem({
  ticket,
  isOpen,
  onToggle,
}: TicketItemProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const getDepartmentLabel = (value: string) => {
    return TICKET_DEPARTMENTS.find((d) => d.value === value)?.label || value;
  };

  return (
    <>
      <div
        className={`group ${ticket.status === "pending" ? "bg-red-200" : "bg-green-200"} border-neutral4 flex w-full flex-col rounded-xl border p-4 max-md:p-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="group-hover:text-primary cursor-pointer font-bold transition-colors"
              onClick={onToggle}
            >
              {ticket.subject}
            </span>
            <span className="bg-primary inline-block h-5 w-0.5 rounded-xs" />
            {new Date(ticket.createdAt).toLocaleDateString("fa-IR")}
          </div>
          <div
            className="flex cursor-pointer items-center gap-x-2"
            onClick={onToggle}
          >
            <span className="text-shade2 hover:text-primary font-medium transition-colors max-md:hidden">
              مشاهده جزئیات
            </span>
            <MdKeyboardArrowDown
              className={`group-hover:text-primary size-6 shrink-0 transition-transform duration-200 ${
                isOpen && "rotate-180"
              }`}
            />
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ${
            isOpen
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-start gap-x-3 max-md:gap-x-1">
                {ticket.attachment && (
                  <div
                    className="border-primary relative size-30 cursor-pointer overflow-hidden rounded-lg border border-dashed"
                    onClick={() =>
                      ticket.attachment && setLightboxSrc(ticket.attachment!)
                    }
                  >
                    <Image
                      alt="attachment"
                      src={ticket.attachment}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="custom-scroll border-primary bg-neutral2 flex h-30 w-full flex-col overflow-y-auto rounded-lg border-r-4 px-3 py-4">
                  <div className="flex items-center justify-between max-md:items-start">
                    <div className="mb-2 flex items-center gap-x-2 max-md:flex-col max-md:items-start">
                      <span className="font-medium max-md:font-normal">
                        <span className="max-md:hidden">موضوع:</span> {ticket.subject}
                      </span>
                      <span className="bg-primary inline-block h-5 w-0.5 rounded-xs max-md:hidden" />
                      <span className="font-medium max-md:mt-1 max-md:font-normal">
                        <span className="max-md:hidden">دپارتمان:</span>{" "}
                        {getDepartmentLabel(ticket.department)}
                      </span>
                    </div>
                    <div className="ltr text-neutral11 max-md:text-sm">
                      {new Date(ticket.createdAt).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <p className="text-neutral10 max-md:text-sm whitespace-pre-wrap">
                    {ticket.message}
                  </p>
                </div>
              </div>
              {ticket.adminReply && (
                <div className="border-primary rounded-lg border-r-4 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="mb-1 font-medium">پاسخ ادمین:</div>
                    <div className="ltr text-neutral11 max-md:text-sm">
                      {new Date(ticket.adminReply.createdAt).toLocaleDateString(
                        "fa-IR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700 mt-2 max-md:text-sm">
                    {ticket.adminReply.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <Lightbox
          open={!!lightboxSrc}
          close={() => setLightboxSrc(null)}
          slides={[{ src: lightboxSrc }]}
        />
      )}
    </>
  );
}
