"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import LikeButton from "./LikeButton";

interface ProductGalleryProps {
  mainImage: string;
  productName: string;
  images?: string[];
  id: string;
}

export default function ProductGallery({
  mainImage,
  productName,
  images = [],
  id,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const allImages = images.length > 0 ? images : [mainImage];

  const slides = allImages.map((src) => ({ src }));

  const handleImageClick = () => {
    const index = allImages.findIndex((img) => img === activeImage);
    setPhotoIndex(index >= 0 ? index : 0);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex w-89 flex-col items-center justify-center gap-y-4 max-xl:mx-20 max-xl:basis-40/100 max-lg:mx-auto max-sm:w-full">
        {/* big pic */}
        <div
          onClick={handleImageClick}
          className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
        >
          <Image
            src={activeImage}
            alt={productName}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
          <div onClick={e => e.stopPropagation()}>
            <LikeButton className="top-4 right-4" productId={id} />
          </div>
        </div>

        {/* thumbnails */}
        <div className="flex justify-between gap-x-3 *:cursor-pointer max-[400px]:gap-x-2">
          {allImages.slice(0, 4).map((img, idx) => (
            <div
              key={img}
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

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={photoIndex}
        controller={{closeOnBackdropClick : true}}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
        }}
      />
    </>
  );
}
