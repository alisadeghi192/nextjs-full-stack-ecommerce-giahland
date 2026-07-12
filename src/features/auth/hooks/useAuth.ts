import { useAuthStore } from "@/stores/useAuthStore";

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser, logout, checkAuth } = useAuthStore();

  return {
    role : user?.role,
    user,
    isLoading,
    isAuthenticated,
    isAdmin: user?.role === "admin",
    isPlantDoctor: user?.role === "plant-doctor",
    setUser,
    logout,
    checkAuth,
  };
};