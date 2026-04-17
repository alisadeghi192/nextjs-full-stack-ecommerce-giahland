import { RiFlowerFill, RiPlantFill, RiTreeFill } from "react-icons/ri";
import PlantDoctorServiceCard from "./PlantDoctorServiceCard";
import { AiFillExperiment } from "react-icons/ai";
import { FaTemperatureFull, FaTree } from "react-icons/fa6";
import { PiPlantFill } from "react-icons/pi";
import { GiFlowerEmblem } from "react-icons/gi";

export default function PlantDoctorServices() {
  const plantDoctorServices = [
    {
      title: "چک کردن اسید خاک",
      icon: RiPlantFill,
      description: "با استفاده از ابزار مخصوص اسید خاک گیاه چک می‌شود.",
    },
    {
      title: "برسی مواد معدنی خاک",
      icon: AiFillExperiment,
      description:
        "یکی از موارد مهم خاک، مقدار مواد معدنی آن است که با دقت برسی می‌شود.",
    },
    {
      title: "مشاهده بهترین دما",
      icon: FaTemperatureFull,
      description:
        "از موارد مهم برای گیاه مقدار دمای محیط است که باید اندازه گیری شود.",
    },
    {
      title: "برسی آسیب های احتمالی",
      icon: FaTree,
      description:
        "تمامی آسیب های احتمالی برسی میگردد تا از وقوع مشکلات آینده جلوگیری شود.",
    },
    {
      title: "از بین بردن عناصر آلوده خاک",
      icon: RiTreeFill,
      description:
        "با استفاده از روش های نوین،عناصر آلوده از خاک گیاهان شما جمع آوری می‌شوند.",
    },
    {
      title: "برسی ظاهر",
      icon: RiFlowerFill,
      description:
        "ظاهر گیاه بیانگر مسائل مهمی هست.می‌توان با مشاهده ظاهر گیاه متوجه آفات و ... شد.",
    },
    {
      title: "اندازه گیری EC ",
      icon: PiPlantFill,
      description:
        "این اندازه گیری نشانی از مقدار کل مواد مغذی موجود برای گیاهان می‌دهد",
    },
    {
      title: "ارائه مکمل",
      icon: GiFlowerEmblem,
      description:
        "برای رشد بهتر گیاهان و رفع آفات از مکمل ها میتوان استفاده کرد.",
    },
  ];
  return (
    <section className="mt-16 max-sm:mt-10">
      <h4 className="text-primary mb-6 text-2xl/8.5 font-bold max-sm:text-xl/7 max-sm:font-semibold">
        خدمات گیاه پزشکی
      </h4>
      <div className="max-xs:grid-cols-1 [&>*:nth-child(even)]:max-xs:justify-self-start mt-8 grid grid-cols-4 gap-x-6 gap-y-12 max-xl:grid-cols-3 max-xl:gap-y-10 max-lg:grid-cols-2 max-lg:gap-y-8 max-sm:mt-6 max-sm:grid-cols-1 max-sm:gap-y-6 [&>*:nth-child(even)]:max-sm:justify-self-end">
        {plantDoctorServices.map((service) => (
          <PlantDoctorServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}
