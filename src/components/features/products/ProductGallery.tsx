"use client";
import { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

interface ProductGalleryProps {
  mainImage: string;
  productName: string;
  images?: string[];
}

export default function ProductGallery({ mainImage, productName, images = [] }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  const allImages = images.length > 0 ? images : [mainImage];

  return (
    <div className="flex w-89 flex-col items-center justify-center gap-y-4 max-xl:mx-20 max-xl:basis-40/100 max-lg:mx-auto max-sm:w-full">
      {/* big pic */}
      <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg">
        <Image
          src={activeImage}
          alt={productName}
          fill
          className="object-contain"
          priority
        />
        <LikeButton className="top-4 right-4" />
      </div>
      {/* thumbnails */}
      <div className="flex justify-between gap-x-3 *:cursor-pointer max-[400px]:gap-x-2">
        {allImages.slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`border-neutral6 size-20 rounded-lg border p-1 max-[400px]:size-17.5 ${
              activeImage === img ? "border-primary" : ""
            }`}
          >
            <Image
              width={70}
              height={70}
              src={img}
              alt={`${productName} - ${idx + 1}`}
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}