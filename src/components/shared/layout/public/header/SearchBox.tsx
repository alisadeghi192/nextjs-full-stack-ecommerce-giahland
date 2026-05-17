"use client";
import { useScroll } from "@/lib/hooks/useScroll";
import { MdOutlineSearch } from "react-icons/md";

const SearchBox = () => {
  const isScroll = useScroll(80);
  return (
    <div
      className={`${isScroll ? "h-8" : "h-10"} bg-neutral3 flex w-full items-center gap-x-2 rounded-xl px-3 py-2.5 transition-all`}
    >
      <MdOutlineSearch className="text-neutral9 size-5" />
      <input
        type="text"
        placeholder="جستجوی گیاه"
        className="text-neutral11 placeholder:text-neutral9 w-full border-0 outline-0"
      />
    </div>
  );
};
export default SearchBox;
