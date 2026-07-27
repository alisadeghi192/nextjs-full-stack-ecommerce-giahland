"use server";

import { getWebPFileName, validateAndProcessImage } from "@/lib/utils/image-upload";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function uploadAttachment(file: File): Promise<string> {
  const webpBuffer = await validateAndProcessImage(file);
  const webpFileName = getWebPFileName(file.name);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const uploadDir = path.join("public/uploads/tickets", String(year), month);
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, webpFileName);
  await writeFile(filePath, webpBuffer);

  return `/uploads/tickets/${year}/${month}/${webpFileName}`;
}