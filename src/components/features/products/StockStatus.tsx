interface StockStatusProps {
  stock: number;
  className: string;
}

export default function StockStatus({ stock, className }: StockStatusProps) {
  if (stock > 0) return null;
  
  return (
    <span className={className}>
      ناموجود
    </span>
  );
}