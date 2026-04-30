import { CareItem } from "@/features/products/types/product.types";

interface ProductCaresRendererProps {
  light: CareItem[];
  watering: CareItem[];
  soil: CareItem[];
  temperature: CareItem[];
  fertilization: CareItem[];
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
  );
}