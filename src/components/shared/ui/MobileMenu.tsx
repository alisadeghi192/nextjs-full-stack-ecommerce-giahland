"use client";

import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import NavLink from "./NavLink";
import { navLinks } from "@/lib/constants";



const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => console.log("open")}
        className="bg-neutral3 flex size-8 items-center justify-center rounded-lg sm:size-10"
      >
        <MdOutlineMenu className="size-5 sm:size-6" />
      </button>
    </>
  );
};
export default MobileMenu;
