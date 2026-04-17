declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.css';
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
