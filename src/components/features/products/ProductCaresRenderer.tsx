import { ICareItem } from "@/features/products/types/product.types";

interface ProductCaresRendererProps {
  light: ICareItem[];
  watering: ICareItem[];
  soil: ICareItem[];
  temperature: ICareItem[];
  fertilization: ICareItem[];
}

export default function ProductCaresRenderer({
  light,
  watering,
  soil,
  temperature,
  fertilization,
}: ProductCaresRendererProps) {
  const careSections = [
    { title: "نور", items: light },
    { title: "آبیاری", items: watering },
    { title: "خاک", items: soil },
    { title: "دما و رطوبت", items: temperature },
    { title: "کوددهی", items: fertilization },
  ];

  return (
    <div
      id="cares"
      className="border-tint7 scroll-mt-25 space-y-2 border-b border-dashed py-6 text-justify leading-7.25 max-md:scroll-mt-35 max-sm:scroll-mt-35"
    >
      <h5 className="font-bold">شرایط نگهداری (مخصوص آپارتمان)</h5>

      <div className="text-neutral10 max-xs:text-sm/6.25">
        <ol className="list-decimal pr-6">
          {careSections.map((section) => (
            <li key={section.title}>
              {section.title}
              <ul className="list-disc pr-6">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title}: {item.description}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
