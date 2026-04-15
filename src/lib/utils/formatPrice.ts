export const formatPrice = (price: number, unit: boolean = true): string => {
  return `${price.toLocaleString("fa-IR")} ${unit ? 'تومان' : ""}`;
};