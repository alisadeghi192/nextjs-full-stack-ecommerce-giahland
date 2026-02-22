import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="basis-1/3 text-center max-md:mt-7">
      <div className="bg-bg-service mb-2 flex size-20 items-center justify-center justify-self-center rounded-full max-sm:size-18">
        <div className="text-primary size-10 max-sm:size-8">{icon}</div>
      </div>
      <h5 className="text-neutral12 mb-1 text-xl/7 font-semibold max-sm:text-base/5.5 max-sm:font-medium">
        {title}
      </h5>
      <p className="text-neutral11 line-clamp-4 text-sm/6.25 max-sm:text-[12px]/5.5">
        {description}
      </p>
    </div>
  );
}
