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
