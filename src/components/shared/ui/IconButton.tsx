"use client";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-primary hover:border-shade2 group flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-colors sm:size-10 sm:rounded-xl lg:size-12`}
    >
      <span className="text-primary group-hover:text-shade2 transition-colors">
        {icon}
      </span>
    </button>
  );
};
export default IconButton;
