import LogoutButton from "@/components/auth/LogoutButton";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { redirect } from "next/navigation";
import { MdBlock } from "react-icons/md";

export default async function BlockedPage() {
  const { user } = await getMeAction();

  if (!user || !user.isBlocked) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mt-6 w-full max-w-md rounded-2xl bg-white p-8 max-sm:p-4 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <MdBlock className="size-10 text-red-600" />
        </div>

        <h1 className="mb-2 text-2xl max-sm:text-xl font-bold text-gray-800">
          حساب کاربری مسدود است.
        </h1>

        <p className="text-neutral9 mb-4 text-sm">
          حساب کاربری شما توسط ادمین مسدود شده است.
          <br />
          برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.
        </p>

        <LogoutButton />

        <OutlineButton href="/contact" className="mt-2 h-10">
          صفحه تماس با ما
        </OutlineButton>
      </div>
    </div>
  );
}
