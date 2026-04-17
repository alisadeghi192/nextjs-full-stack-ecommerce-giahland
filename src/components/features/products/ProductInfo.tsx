import { formatDimensions } from "@/lib/utils/formatDimensions";

interface ProductInfoProps {
  name: string;
  potDimensions: { length: number; width: number; height: number };
  stock: number;
  nameClassName: string;
}

export default function ProductInfo({ 
  name, 
  potDimensions, 
  stock, 
  nameClassName = "" 
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <p className={`group-hover:text-primary transition ${stock === 0 ? "text-neutral9" : ""} ${nameClassName}`}>
        {name}
      </p>
      <p className="text-neutral9 text-sm/6.25">
        ابعاد: {formatDimensions(potDimensions)}
      </p>
    </div>
  );
}