"use client";
import { toPersianNumber } from "@/lib/utils/format";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="bg-neutral2 dark:bg-shade4 group transition-colors border-neutral4 dark:border-neutral10 flex w-full cursor-pointer flex-col rounded-xl border p-4"
          >
            <div className="flex items-start justify-between">
              <span className="font-bold transition-colors group-hover:text-primary dark:group-hover:text-primary-dark">
                {toPersianNumber(+item.id)}. {item.title}
              </span>
              <MdKeyboardArrowDown
                className={`size-6 shrink-0  group-hover:text-primary transition-transform duration-200 ${isOpen && "rotate-180"}`}
              />
            </div>
            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-neutral10 dark:text-text-dark text-justify leading-7.25">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}