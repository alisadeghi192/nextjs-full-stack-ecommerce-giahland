import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import DiscountBadge from "./DiscountBadge";
import LikeButton from "./LikeButton";
import PriceSection from "./PriceSection";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import StockStatus from "./StockStatus";

interface ProductCardGridProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  discount: number;
  potDimensions: {
    length: number;
    width: number;
    height: number;
  };
  stock: number;
  isLiked?: boolean;
}

export default function ProductCardGrid({
  _id,
  name,
  price,
  image,
  category,
  slug = "/",
  discount,
  potDimensions,
  stock,
  isLiked = false,
}: ProductCardGridProps) {
  const isOutOfStock = stock === 0;
  const hasDiscount = discount > 0;

  const contentElement = (
    <div className="flex flex-col">
      <ProductImage image={image} view="grid" name={name} />
      <div className="mt-auto flex flex-col gap-y-4 max-sm:gap-y-2">
        <ProductInfo
          name={name}
          potDimensions={potDimensions}
          stock={stock}
          nameClassName="max-xs:text-sm mt-2 line-clamp-1 text-lg/8 max-sm:text-base/7.25"
        />
        <div className="flex items-center justify-between">
          {isOutOfStock ? (
            <StockStatus
              stock={stock}
              className="text-error max-xs:text-sm mr-auto text-lg/8 max-sm:text-base/7.25"
            />
          ) : (
            <>
              <AddToCartButton className="bg-neutral3 hover:bg-primary flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:*:text-white" />
              <PriceSection
                price={price}
                discount={discount}
                variant="product-card"
              />
            </>
          )}
        </div>
      </div>
      {hasDiscount && !isOutOfStock && (
        <DiscountBadge discount={discount} className="absolute top-5 right-5" />
      )}
    </div>
  );

  return (
    <div className="group border-neutral5 relative flex h-full flex-col justify-between gap-y-2 justify-self-center overflow-hidden rounded-xl border bg-white p-4 max-xl:gap-y-4 max-sm:max-w-57">
      {isOutOfStock ? (
        <div className="cursor-default">{contentElement}</div>
      ) : (
        <Link href={`/products/${category}/${slug}`}>{contentElement}</Link>
      )}
      {!isOutOfStock && (
        <LikeButton
          className="top-4 -left-9 group-hover:left-4 max-md:left-4!"
          productId={_id}
          initialLiked={isLiked}
        />
      )}
    </div>
  );
}
