import Image from "next/image";

interface ProductImageProps {
  name: string;
  image: string;
  view: "grid" | "list";
}

export default function ProductImage({ name, image, view }: ProductImageProps) {
  if (view === "grid") {
    return (
      <Image
        alt={name}
        src={image}
        width={256}
        height={261}
        className="aspect-square self-center rounded-lg object-cover"
      />
    );
  }

  return (
    <Image
      alt={name}
      src={image}
      width={120}
      height={120}
      className="aspect-square rounded-lg object-cover max-md:size-22.5"
    />
  );
}
