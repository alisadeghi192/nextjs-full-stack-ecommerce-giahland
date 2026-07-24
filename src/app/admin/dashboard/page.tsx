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
import { formatDate } from "@/lib/utils/format";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const [
    ordersCount,
    productsCount,
    usersCount,
    doctorsCount,
    revenueResult,
    recentOrders,
    recentMessages,
    recentComments,
    recentTickets,
    discountedProductsCount,
    articlesCount,
    activeConsulationsCount,
  ] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments(),
    PlantDoctor.countDocuments(),
    Order.aggregate([
      { $match: { status: { $in: ["paid", "delivered"] } } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),
    Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    getRecentContactMessages(5),
    getRecentComments(5),
    getRecentTickets(5),
    Product.countDocuments({ discount: { $gt: 0 } }),
    Article.countDocuments(),
    Consultation.countDocuments({ status: "active" }),
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle title="داشبورد مدیریت" className="mb-0!" />
        <span className="text-primary font-medium">
          {formatDate(new Date())}
        </span>
      </div>

      <StatsCards
        ordersCount={ordersCount}
        productsCount={productsCount}
        usersCount={usersCount}
        doctorsCount={doctorsCount}
        totalRevenue={totalRevenue}
      />
      <QuickStats
        discountedProducts={discountedProductsCount}
        articles={articlesCount}
        consultations={activeConsulationsCount}
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
