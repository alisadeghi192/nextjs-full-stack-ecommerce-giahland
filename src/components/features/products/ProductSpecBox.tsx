interface ProductSpecBoxProps {
  label: string;
  value: string;
}

export default function ProductSpecBox({ label, value }: ProductSpecBoxProps) {
  return (
    <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
      <span className="text-neutral9 text-sm/6.25">{label}</span>
      <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
        {value}
      </span>
    </div>
  );
}