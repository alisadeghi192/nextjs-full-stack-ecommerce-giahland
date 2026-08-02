"use client";
import { useState } from "react";
import toast from "react-hot-toast";

interface ConfirmDialogProps {
  onConfirm: () =>
    | void
    | Promise<void>
    | Promise<{ success: boolean; message: string }>;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  onConfirm,
  disabled,
  className,
  children,
  title = "آیا از حذف این آیتم مطمئن هستید؟",
  confirmText = "حذف",
  cancelText = "انصراف",
}: ConfirmDialogProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClick = () => {
    if (isConfirmOpen) {
      return;
    }
    setIsConfirmOpen(true);
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">{title}</p>
          <div className="mt-3 flex justify-start gap-4">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await onConfirm();
                setIsConfirmOpen(false);
              }}
              className="bg-error cursor-pointer rounded-lg px-3 py-1 text-white"
            >
              {confirmText}
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setIsConfirmOpen(false);
              }}
              className="bg-neutral3 dark:bg-shade3 cursor-pointer rounded-lg px-3 py-1"
            >
              {cancelText}
            </button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
