import { useAuthStore } from "@/stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";

const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
const useIsLoading = () => useAuthStore((s) => s.isLoading);
const useUserRole = () => useAuthStore((s) => s.user?.role);
const useUserId = () => useAuthStore((s) => s.user?._id);
const useUserMobile = () => useAuthStore((s) => s.user?.mobile);
const useUserEmail = () => useAuthStore((s) => s.user?.email);

const useIsAdmin = () => useAuthStore((s) => s.user?.role === "admin");
const useIsPlantDoctor = () => useAuthStore((s) => s.user?.role === "plant-doctor");

const useUserBasicInfo = () =>
  useAuthStore(
    useShallow((s) => ({
      _id: s.user?._id,
      role: s.user?.role,
      mobile: s.user?.mobile,
      email: s.user?.email,
      isAuthenticated: s.isAuthenticated,
    }))
  );

const useAuthActions = () =>
  useAuthStore(
    useShallow((s) => ({
      setUser: s.setUser,
      logout: s.logout,
    }))
  );

export {
  useIsAuthenticated,
  useIsLoading,
  useUserRole,
  useUserId,
  useUserMobile,
  useUserEmail,
  useIsAdmin,
  useIsPlantDoctor,
  useUserBasicInfo,
  useAuthActions,
};