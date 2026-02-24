"use client";
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
  const [authType, setAuthType] = useState<authTypes>("register");

  return (
    <main className="flex h-dvh items-center">
      {authType === "register" ? (
        <div className="w-1/2">
          <div className="mx-auto w-72/100">
            <h5 className="mb-8 text-xl/7 font-semibold">ثبت نام</h5>
            <form className="flex flex-col gap-y-6">
              <div className="border-neutral6 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdOutlineMobileFriendly className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="شماره موبایل"
                  type="text"
                  name="phone"
                />
              </div>
              <div className="border-neutral6 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdMailOutline className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="ایمیل"
                  type="text"
                  name="email"
                />
              </div>
              <div className="border-neutral6 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdOutlineKey className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="رمز عبور"
                  type="text"
                  name="password"
                />
                {/* <MdOutlineVisibility className="size-5.5 text-neutral9"/>  */}
                <MdOutlineVisibilityOff className="text-neutral9 size-5.5" />
              </div>
              <div className="border-neutral6 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdOutlineKey className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="تکرار رمز عبور"
                  type="text"
                  name="password-confirm"
                />
                {/* <MdOutlineVisibility className="size-5.5 text-neutral9"/>  */}
                <MdOutlineVisibilityOff className="text-neutral9 size-5.5" />
              </div>
              <button
                type="submit"
                className="bg-primary text-WHITE mt-2 h-14 rounded-xl text-lg"
              >
                ثبت نام
              </button>
            </form>
            <p className="mt-3 text-center">
              حساب کاربری دارید؟
              <span onClick={()=>setAuthType('login')} className="text-primary cursor-pointer">ورود </span>
              کنید.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-1/2">
          <div className="mx-auto w-72/100">
            <h5 className="mb-8 text-xl/7 font-semibold">ورود</h5>
            <form className="flex flex-col">
              <div className="border-neutral6 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdOutlineMobileFriendly className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="شماره موبایل"
                  type="text"
                  name="phone"
                />
              </div>

              <div className="border-neutral6 mt-6 mb-4 flex h-14 items-center gap-x-2 rounded-xl border px-3.75">
                <MdOutlineKey className="text-neutral9 size-5.5" />
                <input
                  className="placeholder:text-neutral9 text-neutral11 flex-1 border-0 outline-0"
                  placeholder="رمز عبور"
                  type="text"
                  name="password"
                />
                {/* <MdOutlineVisibility className="size-5.5 text-neutral9"/>  */}
                <MdOutlineVisibilityOff className="text-neutral9 size-5.5" />
              </div>

              <p className="text-primary text-sm">بازیابی رمز عبور</p>

              <button
                type="submit"
                className="bg-primary text-WHITE mt-8 h-14 rounded-xl text-lg"
              >
                ورود
              </button>
            </form>
            <p className="mt-3 text-center">
              حساب کاربری ندارید؟
              <span onClick={()=>setAuthType('register')} className="text-primary cursor-pointer"> ثبت نام </span>
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
