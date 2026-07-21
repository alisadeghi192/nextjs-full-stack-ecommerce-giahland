"use client";

import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import UserInfoCard from "./UserInfoCard";
import UserRecentComments from "./UserRecentComments";
import UserRecentOrders from "./UserRecentOrders";
import UserStatsCard from "./UserStatsCard";

interface UserDetailContentProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    role: "admin" | "user" | "plant-doctor";
    avatar: string;
    createdAt: Date;
    isBlocked?: boolean;
    postalCode?: string;
    address?: string;
    specialties?: string;
    yearsOfExperience?: number;
    consultationFee?: number;
    successfulConsultations?: number;
  };
  stats: {
    ordersCount: number;
    totalSpent: number;
    commentsCount: number;
    lastActivity: Date;
  };
  recentOrders: {
    _id: string;
    trackingCode?: string;
    finalAmount: number;
    status: "pending" | "paid" | "delivered";
    createdAt: Date;
  }[];
  recentComments: {
    _id: string;
    text: string;
    isApproved?: boolean;
    createdAt?: Date;
  }[];
  isSuperAdmin: boolean;
  isRegularUser: boolean;
}

export default function UserDetailContent({
  user,
  stats,
  recentOrders,
  recentComments,
  isSuperAdmin,
  isRegularUser,
}: UserDetailContentProps) {
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div className="space-y-4">
      <div className={`flex items-start gap-4 ${isSidebarOpen ? "flex-col" : "max-xl:flex-col"} `}>
        <div className={`flex-2 max-xl:w-full ${isSidebarOpen ? "w-full" : "max-xl:w-full"}`}>
          <UserInfoCard user={user} isSuperAdmin={isSuperAdmin} />
        </div>
        <div className={`flex-1 ${isSidebarOpen ? "w-full" : "max-xl:w-full"}`}>
          <UserStatsCard stats={stats} />
        </div>
      </div>

      {isRegularUser && <UserRecentOrders orders={recentOrders} />}
      <UserRecentComments comments={recentComments} />
    </div>
  );
}
