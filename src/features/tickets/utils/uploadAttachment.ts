"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function uploadAttachment(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const timestamp = now.getTime();

  const uploadDir = path.join("public/uploads/tickets", String(year), month);
  await mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/tickets/${year}/${month}/${fileName}`;
}