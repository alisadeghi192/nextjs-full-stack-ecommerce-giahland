interface ProductTitleHeaderProps {
  categoryName: string;
  productName: string;
  wrapperClassName?: string;   
  spanClassName?: string;     
  titleClassName?: string;     
}

export default function ProductTitleHeader({
  categoryName,
  productName,
  wrapperClassName = "",
  spanClassName = "",
  titleClassName = "",
}: ProductTitleHeaderProps) {
  return (
    <div className={`border-neutral7 mb-7 flex flex-col gap-y-4 border-b pb-4 ${wrapperClassName}`}>
      <span className={`text-primary leading-5.5 font-medium ${spanClassName}`}>
        نهال و گیاهان {categoryName}
      </span>
      <h2 className={`text-neutral12 text-xl font-semibold ${titleClassName}`}>
        گیاه طبیعی {productName}
      </h2>
    </div>
  );
}