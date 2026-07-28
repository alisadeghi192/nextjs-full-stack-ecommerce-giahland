import { IconType } from "react-icons";

interface PlantDoctorServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export default function PlantDoctorServiceCard({
  icon: Icon,
  title,
  description,
}: PlantDoctorServiceCardProps) {
  return (
    <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
      <div className="bg-bg-service dark:bg-shade4 transition-colors flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
        <Icon className="text-primary dark:text-primary-dark transition-colors size-8 max-md:size-6" />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <h6 className="text-neutral12 transition-colors dark:text-neutral2 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
          {title}
        </h6>
        <p className="text-neutral11 dark:text-neutral6 transition-colors text-[12px]/5.5">{description}</p>
      </div>
    </div>
  );
}
