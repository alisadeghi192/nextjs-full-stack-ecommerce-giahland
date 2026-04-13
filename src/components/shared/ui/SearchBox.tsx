"use client";
import { useScroll } from "@/lib/hooks/useScroll";
import { MdOutlineSearch } from "react-icons/md";

const SearchBox = () => {
  const isScroll = useScroll(80);
  return (
    <div
      className={`bg-neutral3 flex h-10 w-full items-center gap-x-2 rounded-lg px-3 py-2.5 transition-all ${isScroll ? "h-8!" : ""}`}
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
