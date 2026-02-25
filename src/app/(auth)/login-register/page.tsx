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
              <div className="border-neutral6 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdOutlineMobileFriendly className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />

                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="text"
                  name="register-phone"
                  id="register-phone"
                  placeholder=" "
                />

                <label
                  htmlFor="register-phone"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  شماره موبایل
                </label>
              </div>
              <div className="border-neutral6 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdMailOutline className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  ایمیل
                </label>
              </div>

              <div className="border-neutral6 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdOutlineKey className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="password"
                  name="register-password"
                  id="register-password"
                  placeholder=" "
                />
                <label
                  htmlFor="register-password"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  رمز عبور
                </label>
                <MdOutlineVisibilityOff className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
              </div>
              <div className="border-neutral6 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdOutlineKey className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
                {/* <MdOutlineVisibility className="size-5.5 text-neutral9"/>  */}

                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder=" "
                />

                <label
                  htmlFor="confirm-password"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  تکرار رمز عبور
                </label>
                <MdOutlineVisibilityOff className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
                {/* <MdOutlineVisibility className="size-5.5 text-neutral9"/>  */}
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
              <span
                onClick={() => setAuthType("login")}
                className="text-primary cursor-pointer"
              >
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
            <form className="flex flex-col">
              <div className="border-neutral6 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdOutlineMobileFriendly className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />

                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="text"
                  name="login-phone"
                  id="login-phone"
                  placeholder=" "
                />

                <label
                  htmlFor="login-phone"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  شماره موبایل
                </label>
              </div>

              <div className="border-neutral6 mt-6 mb-4 group focus-within:border-primary relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200">
                <MdOutlineKey className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
                <input
                  className="peer text-neutral11 flex-1 border-0 outline-0"
                  type="password"
                  name="login-password"
                  id="login-password"
                  placeholder=" "
                />
                <label
                  htmlFor="login-password"
                  className="text-neutral9 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary absolute right-10.25 bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7"
                >
                  رمز عبور
                </label>
                <MdOutlineVisibilityOff className="text-neutral9 group-focus-within:text-primary relative z-10 size-5.5 transition-colors duration-200" />
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
