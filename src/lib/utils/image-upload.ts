import sharp from "sharp";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateAndProcessImage = async (file: File): Promise<Buffer> => {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("فایل انتخابی باید یک تصویر باشد.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
};

export const getWebPFileName = (originalName: string): string => {
  const base = originalName.split(".").slice(0, -1).join(".");
  return `${base || "image"}.webp`;
};