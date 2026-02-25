"use client";
import FormField from "@/app/components/features/auth/FormField";
import PasswordField from "@/app/components/features/auth/PasswordField";
import React, { useState } from "react";
import {
  MdMailOutline,
  MdOutlineKey,
  MdOutlineMobileFriendly,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

type authTypes = "login" | "register";

function page() {
  const [authType, setAuthType] = useState<authTypes>("login");

  return (
    <main className="flex h-dvh items-center">
      {authType === "register" ? (
        <div className="w-1/2">
          <div className="mx-auto w-72/100">
            <h5 className="mb-8 text-xl/7 font-semibold">ثبت نام</h5>
            <form className="flex flex-col gap-y-6">
              <FormField
                icon={<MdOutlineMobileFriendly size={22} />}
                type="text"
                name="register-phone"
                id="register-phone"
                label="شماره موبایل"
              />
              <FormField
                icon={<MdMailOutline size={22} />}
                type="email"
                name="email"
                id="email"
                label="ایمیل"
              />
              <PasswordField
                name="register-password"
                id="register-password"
                label="رمز عبور"
              />
              <PasswordField
                name="confirm-password"
                id="confirm-password"
                label="تکرار رمز عبور"
              />

              <button
                type="submit"
                className="bg-primary text-WHITE mt-2 h-14 rounded-xl text-lg"
              >
                ثبت نام
              </button>
            </form>
            <p className="mt-3 text-center">
              حساب کاربری دارید؟
              <span
                onClick={() => setAuthType("login")}
                className="text-primary cursor-pointer"
              >
                {" "}
                ورود{" "}
              </span>
              کنید.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-1/2">
          <div className="mx-auto w-72/100">
            <h5 className="mb-8 text-xl/7 font-semibold">ورود</h5>
            <form className="flex flex-col gap-y-6">
              <FormField
                icon={<MdOutlineMobileFriendly size={22} />}
                type="text"
                name="login-phone"
                id="login-phone"
                label="شماره موبایل"
              />
              <PasswordField
                name="login-password"
                id="login-password"
                label="رمز عبور"
              />

              <p className="text-primary text-sm -mt-2">بازیابی رمز عبور</p>

              <button
                type="submit"
                className="bg-primary text-WHITE mt-2 h-14 rounded-xl text-lg"
              >
                ورود
              </button>
            </form>
            <p className="mt-3 text-center">
              حساب کاربری ندارید؟
              <span
                onClick={() => setAuthType("register")}
                className="text-primary cursor-pointer"
              >
                {" "}
                ثبت نام{" "}
              </span>
              کنید.
            </p>
          </div>
        </div>
      )}
      <div className="h-screen w-1/2 bg-red-400"></div>
    </main>
  );
}

export default page;
