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

export const toPersianPrice = (price: number, unit: boolean = true): string => {
  return `${price.toLocaleString("fa-IR")} ${unit ? "تومان" : ""}`;
};

export const toPersianNumber = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

export const toPersianDate = (date: Date): string => {
  return date.toLocaleDateString("fa-IR");
};

export const toPersianCode = (num: string): string => {
  return num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) || "";
};

export const toEnglishDigits = (str: string): string => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
};

export const toStyledSlug = (slug: string): string =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const toPersianDateAndTime = (date: Date): string => {
  return date.toLocaleString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
