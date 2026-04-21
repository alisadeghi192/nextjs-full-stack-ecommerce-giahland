interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export const formatDimensions = (dimensions: Dimensions): string => {
  const length = dimensions.length.toLocaleString("fa-IR");
  const width = dimensions.width.toLocaleString("fa-IR");
  const height = dimensions.height.toLocaleString("fa-IR");
  return `${height} × ${width} × ${length}`;
};

export const formatPrice = (price: number, unit: boolean = true): string => {
  return `${price.toLocaleString("fa-IR")} ${unit ? "تومان" : ""}`;
};

export const toPersianNumber = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("fa-IR")
};