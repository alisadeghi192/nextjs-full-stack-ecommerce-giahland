import Image from "next/image";

interface ProductFeaturesRendererProps {
  overview: string[];
  appearance: string[];
  warnings: string[];
  propagation: string[];
  summary: string[];
  productName: string;
  productImage: string;
}

export default function ProductFeaturesRenderer({
  overview,
  appearance,
  warnings,
  propagation,
  summary,
  productName,
  productImage,
}: ProductFeaturesRendererProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h5 className="font-bold">معرفی کلی گیاه {productName}</h5>
        {overview.map((text, idx) => (
          <p key={idx} className="text-neutral10 max-xs:text-sm/6.25">
            {text}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <h5 className="font-bold">ویژگی های ظاهری</h5>
        <div className="text-neutral10 max-xs:text-sm/6.25">
          <ul className="list-disc pr-6">
            {appearance.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="font-bold">نکات ویژه و هشدارها</h5>
        <div className="text-neutral10 max-xs:text-sm/6.25">
          <ol className="list-decimal pr-6">
            {warnings.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="font-bold">تکثیر {productName}</h5>
        <div className="text-neutral10 max-xs:text-sm/6.25">
          <ol className="list-decimal pr-6">
            {propagation.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="font-bold">جمع بندی</h5>
        {summary.map((text, idx) => (
          <p key={idx} className="text-neutral10 max-xs:text-sm/6.25">
            {text}
          </p>
        ))}
      </div>

      <div className="border-neutral4 mx-auto mt-10 w-fit overflow-hidden rounded-2xl border">
        <Image
          alt={productName}
          src={productImage}
          width={360}
          height={360}
          className="object-contain"
        />
      </div>
    </div>
  );
}
