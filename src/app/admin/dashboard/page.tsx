import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import QuickStats from "@/components/admin/dashboard/QuickStats";
import RecentComments from "@/components/admin/dashboard/RecentComments";
import RecentMessages from "@/components/admin/dashboard/RecentMessages";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import RecentTickets from "@/components/admin/dashboard/RecentTickets";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import SectionTitle from "@/components/panel/SectionTitle";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getRecentComments } from "@/features/comments/actions/getRecentComments.actions";
import { getRecentContactMessages } from "@/features/contact/actions/getRecentContactMessages.actions";
import { getRecentTickets } from "@/features/tickets/actions/getRecentTickets.actions";
import Article from "@/lib/db/models/Article";
import Consultation from "@/lib/db/models/Consultation";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { PlantDoctor, User } from "@/lib/db/models/User";
import { toPersianDate } from "@/lib/utils/format";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

const getCachedStats = unstable_cache(
  async () => {
    const [
      ordersCount,
      productsCount,
      usersCount,
      doctorsCount,
      discountedProductsCount,
      articlesCount,
      activeConsulationsCount,
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      PlantDoctor.countDocuments(),
      Product.countDocuments({ discount: { $gt: 0 } }),
      Article.countDocuments(),
      Consultation.countDocuments({ status: "active" }),
    ]);

    return {
      ordersCount,
      productsCount,
      usersCount,
      doctorsCount,
      discountedProductsCount,
      articlesCount,
      activeConsulationsCount,
    };
  },
  ["admin-dashboard-stats"],
  { revalidate: 600, tags: ["admin-stats"] },
);

const getCachedRevenue = unstable_cache(
  async () => {
    const result = await Order.aggregate([
      { $match: { status: { $in: ["paid", "delivered"] } } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]);
    return result.length > 0 ? result[0].total : 0;
  },
  ["admin-dashboard-revenue"],
  { revalidate: 600, tags: ["admin-revenue"] },
);

const getCachedRecentOrders = unstable_cache(
  async () => {
    return await Order.find().sort({ createdAt: -1 }).limit(5).lean();
  },
  ["admin-recent-orders"],
  { revalidate: 600, tags: ["admin-recent-orders"] },
);

const getCachedRecentMessages = unstable_cache(
  async () => {
    return await getRecentContactMessages(5);
  },
  ["admin-recent-messages"],
  { revalidate: 600, tags: ["admin-recent-messages"] },
);

const getCachedRecentComments = unstable_cache(
  async () => {
    return await getRecentComments(5);
  },
  ["admin-recent-comments"],
  { revalidate: 600, tags: ["admin-recent-comments"] },
);

const getCachedRecentTickets = unstable_cache(
  async () => {
    return await getRecentTickets(5);
  },
  ["admin-recent-tickets"],
  { revalidate: 600, tags: ["admin-recent-tickets"] },
);

export default async function AdminDashboardPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const [
    stats,
    totalRevenue,
    recentOrders,
    recentMessages,
    recentComments,
    recentTickets,
  ] = await Promise.all([
    getCachedStats(),
    getCachedRevenue(),
    getCachedRecentOrders(),
    getCachedRecentMessages(),
    getCachedRecentComments(),
    getCachedRecentTickets(),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle title="داشبورد مدیریت" className="mb-0!" />
        <span className="text-primary font-medium">
          {toPersianDate(new Date())}
        </span>
      </div>

      <StatsCards
        ordersCount={stats.ordersCount}
        productsCount={stats.productsCount}
        usersCount={stats.usersCount}
        doctorsCount={stats.doctorsCount}
        totalRevenue={totalRevenue}
      />

      <QuickStats
        discountedProducts={stats.discountedProductsCount}
        articles={stats.articlesCount}
        consultations={stats.activeConsulationsCount}
      />

      <DashboardCharts />

      <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
        <RecentOrders orders={recentOrders} />
        <RecentMessages messages={recentMessages} />
        <RecentComments comments={recentComments} />
        <RecentTickets tickets={recentTickets} />
      </div>
    </div>
  );
}
