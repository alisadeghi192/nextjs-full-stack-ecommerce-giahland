"use client";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
  useUserFirstName,
  useUserLastName,
  useUserMobile,
  useUserEmail,
  useUserAddress,
  useUserPostalCode,
  useUserAvatar,
} from "@/features/auth/selectors/auth.selectors";
import Image from "next/image";
import { useState } from "react";
import { BsSignpost } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { TbEdit, TbTrash } from "react-icons/tb";

export default function ProfileInfoForm() {
  const initialFirstName = useUserFirstName() || "";
  const initialLastName = useUserLastName() || "";
  const initialEmail = useUserEmail() || "";
  const initialAddress = useUserAddress() || "";
  const initialPostalCode = useUserPostalCode() || "";
  const mobile = useUserMobile() || "";
  const avatar = useUserAvatar() || "/static/images/default-user.jpg";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [postalCode, setPostalCode] = useState(initialPostalCode);

  return (
    <div className="border-neutral3 rounded-2xl border p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-x-4">
        <div className="size-20 overflow-hidden rounded-full">
          <Image
            alt={firstName || "user profile"}
            src={avatar}
            width={80}
            height={80}
            className="object-cover object-center"
          />
        </div>
        <button className="flex size-9 cursor-pointer items-center justify-center rounded-lg border text-[#00BBFF]">
          <TbEdit className="size-6" />
        </button>
        <button className="text-error flex size-9 cursor-pointer items-center justify-center rounded-lg border">
          <TbTrash className="size-6" />
        </button>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="firstName"
            name="firstName"
            label="نام"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormField
            icon={<MdDriveFileRenameOutline size={20} />}
            id="lastName"
            name="lastName"
            label="نام خانوادگی"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormField
            icon={<IoPhonePortraitOutline size={20} />}
            id="mobile"
            name="mobile"
            label="شماره موبایل"
            type="text"
            value={mobile}
            disabled
          />
          <FormField
            icon={<BsSignpost size={20} />}
            id="postalCode"
            name="postalCode"
            label="کد پستی"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <FormField
            icon={<MdAlternateEmail size={20} />}
            id="email"
            name="email"
            label="ایمیل"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            icon={<GoHome size={20} />}
            id="address"
            name="address"
            label="آدرس"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <PrimaryButton className="mt-4 mr-auto h-12 w-43 text-lg">ذخیره</PrimaryButton>
      </form>
    </div>
  );
}