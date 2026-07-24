import UserDetailContent from "@/components/admin/users/details/UserDetailContent";
import UserDetailHeader from "@/components/admin/users/details/UserDetailHeader";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUserById } from "@/features/user/actions/getUserById.actions";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPage({ params }: PageProps) {
  const { id } = await params;

  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const result = await getUserById(id);
  if (!result.success || !result.user) {
    notFound();
  }

  const { user: targetUser, stats, recentOrders, recentComments } = result;

  const isSuperAdmin = targetUser.isSuperAdmin || false;
  const isRegularUser = targetUser.role === "user";

  return (
    <section className="space-y-4">
      <UserDetailHeader
      />

      <UserDetailContent
        user={targetUser}
        stats={stats}
        recentOrders={recentOrders}
        recentComments={recentComments}
        isSuperAdmin={isSuperAdmin}
        isRegularUser={isRegularUser}
      />
    </section>
  );
}
