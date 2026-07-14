"use client";

import { formatPrice } from "@/lib/utils/format";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CheckoutDeliveryMethodProps {
  selectedMethod: "pickup" | "courier" | null;
  onChange: (method: "pickup" | "courier") => void;
}

export default function CheckoutDeliveryMethod({
  selectedMethod,
  onChange,
}: CheckoutDeliveryMethodProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLabel = (method: "pickup" | "courier" | null) => {
    if (method === "courier") {
      return <span className="text-primary text-sm">✓ ارسال با پیک مخصوص</span>;
    }
    if (method === "pickup") {
      return <span className="text-primary text-sm">✓ تحویل حضوری</span>;
    }
    return <span className="text-error text-sm">روش تحویل را انتخاب کنید</span>;
  };

  const handleSelect = (method: "pickup" | "courier") => {
    onChange(method);
    setIsOpen(false)
  };

  return (
    <div className="border-neutral3 rounded-xl border p-4 shadow-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-x-2">
          <span className="text-lg max-md:text-base">روش تحویل</span>
          {getLabel(selectedMethod)}
        </div>
        <MdKeyboardArrowDown
          className={`text-primary size-6 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">
            <label
              className={`border-neutral5 flex cursor-pointer items-center justify-between rounded-xl border p-4 max-[400px]:px-2 transition hover:bg-gray-50 ${
                selectedMethod === "courier"
                  ? "border-primary bg-primary/5"
                  : ""
              }`}
              onClick={() => handleSelect("courier")}
            >
              <div className="flex items-center gap-x-3 max-xs:gap-x-1">
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={selectedMethod === "courier"}
                  onChange={() => {}}
                  className="accent-primary size-5"
                />
                <span className="text-lg max-md:text-base ">
                  ارسال با پیک مخصوص🚚
                </span>
              </div>
              <span className="text-primary font-medium">
                {formatPrice(300000)}
              </span>
            </label>

            <label
              className={`border-neutral5 flex cursor-pointer items-center justify-between rounded-xl border p-4 max-[400px]:px-2 transition hover:bg-gray-50 ${
                selectedMethod === "pickup" ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => handleSelect("pickup")}
            >
              <div className="flex items-center gap-x-3 max-xs:gap-x-1">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={selectedMethod === "pickup"}
                  onChange={() => {}}
                  className="accent-primary size-5"
                />
                <span className="text-lg max-md:text-base">
                  تحویل حضوری در گیاه‌لند🌱
                </span>
              </div>
              <span className="text-neutral9 font-medium">رایگان</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
