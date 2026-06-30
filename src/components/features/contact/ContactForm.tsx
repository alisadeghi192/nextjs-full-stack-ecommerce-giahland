"use client";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import TextareaField from "@/components/shared/ui/TextareaField";
import {
  useUserFirstName,
  useUserLastName,
  useUserMobile,
} from "@/features/auth/selectors/auth.selectors";
import { submitContactMessage } from "@/features/contact/actions/submitContactMessage.actions";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDriveFileRenameOutline,
} from "react-icons/md";

export default function ContactForm() {
  const fname = useUserFirstName();
  const lname = useUserLastName();
  const storeMobile = useUserMobile() || "";
  const displayName = `${fname || ""} ${lname || ""}`.trim();

  const [username, setUsername] = useState<string>(displayName);
  const [userMobile, setUserMobile] = useState<string>(storeMobile);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [notRobot, setNotRobot] = useState<boolean>(false);

useEffect(() => {
  setUsername(displayName);
  setUserMobile(storeMobile);
}, [fname, lname, storeMobile]);

  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    null,
  );

  useEffect(() => {
    if (state?.success && state?.message) {
      toast.success(state.message);
      setUsername("");
      setUserMobile("");
      setSubject("");
      setMessage("");
      setNotRobot(false);
    } else if (state?.errors) {
      const firstError = Object.values(state.errors)[0]?.[0];
      if (firstError) toast.error(firstError);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="basis-1/2 space-y-3" noValidate>
      <input type="hidden" name="notRobot" value={notRobot ? "on" : ""} />

      <FormField
        icon={<MdDriveFileRenameOutline size={22} />}
        type="text"
        name="name"
        id="contact-name"
        label="نام و نام خانوادگی"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormField
        icon={<MdDriveFileRenameOutline size={22} />}
        type="text"
        name="mobile"
        id="contact-phone"
        label="شماره موبایل"
        value={userMobile}
        onChange={(e) => setUserMobile(e.target.value)}
      />
      <FormField
        icon={<MdDriveFileRenameOutline size={22} />}
        type="text"
        name="subject"
        id="contact-subject"
        label="موضوع"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextareaField
        icon={<MdDriveFileRenameOutline size={22} />}
        name="message"
        id="contact-message"
        label="متن پیام"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="text-neutral9 border-neutral6 rounded-xl border px-4 py-2.5">
        <label className="flex cursor-pointer items-center justify-between rounded-xl leading-6 font-medium">
          <div className="flex gap-x-2" onClick={() => setNotRobot(!notRobot)}>
            {notRobot ? (
              <MdCheckBox className="text-primary size-6" />
            ) : (
              <MdCheckBoxOutlineBlank className="text-primary size-6" />
            )}
            <span>من ربات نیستم</span>
          </div>
          <Image
            alt="recaptcha"
            src={"/static/images/recaptcha.webp"}
            width={44}
            height={44}
          />
        </label>
      </div>
      <PrimaryButton disabled={isPending} className="mt-4 h-12 w-full text-lg">
        {isPending ? "در حال ارسال..." : "ارسال"}
      </PrimaryButton>
    </form>
  );
}
