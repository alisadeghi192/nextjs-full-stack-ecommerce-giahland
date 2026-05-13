"use client";

import { forwardRef, ReactNode } from "react";

interface FormFieldProps {
  icon: ReactNode;
  type: string;
  name: string;
  id: string;
  label: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ icon, type, id, name, label, error, value, onChange, onBlur }, ref) => {
    const hasError = !!error;
    return (
      <div >
        <div className={` group relative  flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200 max-sm:h-12 ${hasError ? "border-error focus-within:border-error" : "border-neutral6 focus-within:border-primary"}`}>
          <span className={`relative z-10 size-5.5 transition-colors duration-200 ${hasError ? 'text-error group-focus-within:text-error' : 'text-neutral9 group-focus-within:text-primary'}`}>
            {icon}
          </span>
          <input
            ref={ref}
            type={type}
            name={name}
            id={id}
            placeholder=" "
            className="peer text-neutral11 flex-1 border-0 outline-0"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label
            htmlFor={id}
            className={` absolute right-10.25 rounded-2xl bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm ${hasError ? "text-error peer-focus:text-error peer-[:not(:placeholder-shown)]:text-error" : "text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary"}`}
          >
            {label}
          </label>
        </div>
        {error && <p className="relative top-1 text-error text-sm">{error}</p>}
      </div>
    );
  },
);

export default FormField;
