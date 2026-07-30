"use client";

import { ReactNode } from "react";

interface TextareaFieldProps {
  icon: ReactNode;
  name: string;
  id: string;
  label: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function TextareaField({
  icon,
  name,
  id,
  label,
  disabled = false,
  value,
  onChange,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className="border-neutral6  dark:border-neutral5 focus-within:border-primary dark:focus-within:border-primary-dark group relative flex min-h-14 gap-x-2 rounded-xl border px-3.75 py-4 transition-colors duration-200">
      <span className="text-neutral9 dark:text-neutral5 group-focus-within:text-primary dark:group-focus-within:text-primary-dark relative z-10 size-5.5 transition-colors duration-200">
        {icon}
      </span>
      <textarea
        className="peer text-neutral11 custom-scroll dark:text-neutral3 flex-1 resize-none border-0 outline-0"
        name={name}
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="text-neutral9 dark:text-neutral5 peer-focus:text-primary dark:peer-focus:text-primary-dark peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary-dark dark:bg-shade5 absolute right-10.25 rounded-2xl bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm"
      >
        {label}
      </label>
    </div>
  );
}
