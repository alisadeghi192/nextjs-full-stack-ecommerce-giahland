"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCloudUpload, MdDelete } from "react-icons/md";

import SectionTitle from "@/components/panel/SectionTitle";

interface ProductImageUploaderProps {
  label: string;
  name: string;
  value: File | string | null; 
  onChange: (file: File | null) => void;
  required?: boolean;
}

export default function ProductImageUploader({
  label,
  name,
  value,
  onChange,
  required = false,
}: ProductImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("حجم عکس نباید بیشتر از ۴ مگابایت باشد.");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("فقط فرمت‌های JPEG، PNG و WebP مجاز هستند.");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div>
      <SectionTitle title={label} className="text-sm mb-2!" />

      {preview ? (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-dashed">
          <Image
            src={preview}
            alt={label}
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="bg-error/80 hover:bg-error absolute top-2 left-2 cursor-pointer rounded-full p-2 text-white transition"
          >
            <MdDelete className="size-5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`file-upload-${name}`}
          className="border-neutral6 hover:border-primary flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition"
        >
          <MdCloudUpload className="text-neutral7 size-10" />
          <span className="text-neutral8 mt-2 text-sm">
            برای آپلود کلیک کنید
          </span>
          <span className="text-neutral8 text-xs text-center">
            (حداکثر ۴ مگابایت، JPEG/PNG/WebP)
          </span>
          <input
            type="file"
            id={`file-upload-${name}`}
            name={name}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
            required={required}
          />
        </label>
      )}
    </div>
  );
}