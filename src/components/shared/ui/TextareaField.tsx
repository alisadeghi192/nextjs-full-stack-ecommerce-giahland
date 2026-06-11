"use client";

import { ReactNode } from "react";

interface TextareaFieldProps {
  icon: ReactNode;
  name: string;
  id:string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function TextareaField({
  icon,
  name,
  id,
  label,
  value,
  onChange,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className="border-neutral6 focus-within:border-primary group py-4 relative flex min-h-14 gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
      <span className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200">
        {icon}
      </span>
      <textarea
        className="peer text-neutral11 flex-1 resize-none border-0 outline-0"
        name={name}
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        rows={rows}
      />
      <label
        htmlFor={name}
        className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm"
      >
        {label}
      </label>
    </div>
  );
}
