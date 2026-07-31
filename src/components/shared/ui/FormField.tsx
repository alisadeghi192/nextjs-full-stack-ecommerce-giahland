"use client";

import { forwardRef, ReactNode } from "react";

interface FormFieldProps {
  icon: ReactNode;
  type: string;
  name: string;
  id: string;
  label: string;
  disabled?: boolean;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isPanelSearch?: boolean;
  isMainSearch?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      icon,
      type,
      id,
      name,
      label,
      error,
      value,
      disabled = false,
      onChange,
      onBlur,
      onKeyDown,
      defaultValue,
      isPanelSearch = false,
      isMainSearch = false,
    },
    ref,
  ) => {
    const hasError = !!error;
    return (
      <div>
        <div
          className={`group relative ${isPanelSearch ? "bg-neutral3 h-10" : isMainSearch ? "h-10" : "h-14 max-sm:h-12"} flex items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200 ${hasError ? "border-error focus-within:border-error" : "border-neutral6 dark:border-neutral5 focus-within:border-primary dark:focus-within:border-primary-dark"}`}
        >
          <span
            className={`relative z-10 size-5.5 transition-colors duration-200 ${hasError ? "text-error group-focus-within:text-error" : "text-neutral9 dark:text-neutral5 group-focus-within:text-primary dark:group-focus-within:text-primary-dark"}`}
          >
            {icon}
          </span>
          <input
            ref={ref}
            type={type}
            name={name}
            id={id}
            placeholder={isPanelSearch ? label : " "}
            className={`peer flex-1 border-0 outline-0 ${
              isPanelSearch
                ? "placeholder:text-neutral9 dark:placeholder:text-neutral7 w-18"
                : ""
            } ${disabled ? "text-neutral9 dark:text-neutral7" : "text-neutral11 dark:text-neutral3"}`}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
          <label
            htmlFor={id}
            className={`dark:bg-shade5 pointer-events-none absolute right-10.25 rounded-2xl bg-white px-1 transition-all duration-300 peer-focus:right-4 ${isPanelSearch ? "hidden" : "visible"} ${isMainSearch ? "dark:bg-shade3! peer-focus:-translate-y-5.5 peer-[:not(:placeholder-shown)]:-translate-y-5.5" : "peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:-translate-y-7"} peer-[:not(:placeholder-shown)]:right-4 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm ${hasError ? "text-error peer-focus:text-error peer-[:not(:placeholder-shown)]:text-error" : "text-neutral9 dark:text-neutral5 peer-focus:text-primary dark:peer-focus:text-primary-dark peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary-dark"}`}
            style={{
              transition:
                "translate 300ms ease ,right 300ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {label}
          </label>
        </div>
        {error && <p className="text-error relative top-1 text-sm">{error}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
