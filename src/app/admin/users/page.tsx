import UsersHeader from "@/components/admin/users/UsersHeader";
import UsersList from "@/components/admin/users/UsersList";
import SectionTitle from "@/components/panel/SectionTitle";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUsers } from "@/features/user/actions/getUsers.actions";
import { toPersianNumber } from "@/lib/utils/format";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

interface PageProps {
  searchParams: Promise<{
    role?: string;
    status?: string;
    search?: string;
    page?: string;
    sort?:string
  }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const params = await searchParams;
  const role =
    (params.role as "all" | "admin" | "user" | "plant-doctor") || "all";
  const status = (params.status as "all" | "blocked") || "all";
  const search = params.search || "";
  const sort = (params.sort as "newest" | "oldest") || "newest";
  const currentPage = Number(params.page) || 1;
  const limit = 12;

  const result = await getUsers({
    role,
    status,
    search,
    page: currentPage,
    limit,
    sort,
  });

  const baseUrl = `?role=${role}&status=${status}&search=${search}&sort=${sort}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle title={`مدیریت کاربران (${(toPersianNumber(result.total))})`} className="mb-0!" />
        <OutlineButton
          href="/admin/users/new-doctor"
          className="size-45 h-10 gap-x-1 font-medium"
        >
          افزودن پزشک جدید
          <FaPlus className="size-4" />
        </OutlineButton>
      </div>
      <UsersHeader/>

      {result.users.length === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-8 text-center text-gray-500 shadow-lg">
          {search
            ? "کاربری با این مشخصات یافت نشد."
            : "هیچ کاربری ثبت نام نکرده است."}
        </div>
      ) : (
        <UsersList users={result.users} />
      )}
      {result.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={result.totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
}
