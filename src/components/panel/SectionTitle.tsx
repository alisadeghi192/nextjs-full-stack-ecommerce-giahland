interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-4 flex items-center gap-x-2.5 ${className}`}>
      <span className="bg-primary inline-block h-6 w-0.5 rounded-xs" />
      <h2 className="font-medium">{title}</h2>
    </div>
  );
}