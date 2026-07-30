"use client";

import { forwardRef, useState } from "react";
import {
  MdOutlineKey,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

interface PasswordFieldProps {
  name: string;
  id: string;
  label: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ name, id, label, error, value, onChange, onBlur }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = !!error;

    return (
      <div >
        <div
          className={`group relative flex h-14  items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200 max-sm:h-12 ${hasError ? "border-error focus-within:border-error" : "border-neutral6 dark:border-neutral5 focus-within:border-primary dark:focus-within:border-primary-dark"} `}
        >
          <MdOutlineKey
            className={`relative z-10 size-5.5 transition-colors duration-200 ${hasError ? "text-error group-focus-within:text-error" : "text-neutral9 dark:text-neutral5 group-focus-within:text-primary dark:group-focus-within:text-primary-dark"}`}
          />

          <input
            ref={ref}
            className="peer text-neutral11 dark:text-neutral3 flex-1 border-0 outline-0"
            type={showPassword ? "text" : "password"}
            name={name}
            id={id}
            placeholder=" "
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />

          <label
            htmlFor={id}
            className={`absolute right-10.25 rounded-2xl bg-white dark:bg-shade5 px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm ${hasError ? "text-error peer-focus:text-error peer-[:not(:placeholder-shown)]:text-error" : "text-neutral9 dark:text-neutral5 peer-focus:text-primary dark:peer-focus:text-primary-dark peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary-dark"}`}
          >
            {label}
          </label>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`relative z-10 transition-colors cursor-pointer duration-200 ${hasError ? "text-error group-focus-within:text-error" : "text-neutral9 dark:text-neutral-50 group-focus-within:text-primary dark:group-focus-within:text-primary-dark"}`}
            tabIndex={-1}
          >
            {showPassword ? (
              <MdOutlineVisibilityOff size={22} />
            ) : (
              <MdOutlineVisibility size={22} />
            )}
          </button>
        </div>
        {error && <p className="relative top-1 text-error text-sm">{error}</p>}
      </div>
    );
  },
);

export default PasswordField;
