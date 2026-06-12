import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import DiscountBadge from "./DiscountBadge";
import LikeButton from "./LikeButton";
import PriceSection from "./PriceSection";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import StockStatus from "./StockStatus";
interface ProductCardListProps {
  _id : string
  name: string;
  price: number;
  image: string;
  slug: string;
  category: String;
  discount: number;
  potDimensions: {
    length: number;
    width: number;
    height: number;
  };
  stock: number;
  isLiked?: boolean;
}

export default function ProductCardList({
  _id,
  name,
  price,
  image,
  category,
  slug,
  discount,
  potDimensions,
  stock,
  isLiked = false,
}: ProductCardListProps) {
  const isOutOfStock = stock === 0;
  const hasDiscount = discount > 0;

  const Content = () => (
    <div className="flex gap-x-6 p-4 max-md:gap-x-3">
      <ProductImage image={image} view="list" name={name} />
      <div className="flex grow flex-col justify-between">
        <ProductInfo
          name={name}
          potDimensions={potDimensions}
          stock={stock}
          nameClassName="text-lg/8 line-clamp-1 max-md:text-base max-md:text-wrap"
        />
        <div className="flex items-center justify-end">
          {isOutOfStock ? (
            <StockStatus
              stock={stock}
              className="text-error mr-auto text-lg/8 max-md:text-base"
            />
          ) : (
            <PriceSection price={price} discount={discount} variant="product-card"/>
          )}
        </div>
        {hasDiscount && !isOutOfStock && <DiscountBadge discount={discount} className="absolute top-5 right-5" />}
      </div>
    </div>
  );

  return (
    <div className="border-neutral5 group relative overflow-hidden rounded-lg border">
      {isOutOfStock ? (
        <div className="cursor-default">{Content()}</div>
      ) : (
        <Link href={`/products/${category}/${slug}`}>{Content()}</Link>
      )}
      {!isOutOfStock && (
        <LikeButton
        productId={_id}
        initialLiked={isLiked}
          mobileResponsive={true}
          className="top-4 -left-9 group-hover:left-4 max-md:top-2 max-md:left-2 max-md:size-7 max-md:group-hover:left-2"
        />
      )}
      {!isOutOfStock && (
        <AddToCartButton className="bg-neutral3 hover:bg-primary absolute top-14 -left-9 flex size-8 shrink-0 items-center justify-center rounded-full transition-all group-hover:left-4 hover:*:text-white max-md:top-10 max-md:left-2 max-md:size-7 max-md:group-hover:left-2" />
      )}
    </div>
  );
}
