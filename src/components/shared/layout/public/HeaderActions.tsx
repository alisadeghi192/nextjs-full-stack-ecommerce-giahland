import IconButton from "../../ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";
import AuthButtons from "./AuthButtons";

export default function HeaderActions() {
  return (
    <div className="flex gap-4 max-xl:gap-2">
      <IconButton icon={<MdOutlineDarkMode size={24} />} />
      <IconButton icon={<MdOutlineSearch size={24} />} />
      <IconButton icon={<MdOutlineShoppingCart size={24} />} />
      <AuthButtons />
    </div>
  );
}