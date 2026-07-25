import { useAuthStore } from "@/stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";


const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
const useIsLoading = () => useAuthStore((s) => s.isLoading);
const useUserRole = () => useAuthStore((s) => s.user?.role);
const useUserMobile = () => useAuthStore((s) => s.user?.mobile);
const useUserEmail = () => useAuthStore((s) => s.user?.email);
const useUserFirstName = () => useAuthStore((s) => s.user?.firstName);
const useUserLastName = () => useAuthStore((s) => s.user?.lastName);
const useUserAvatar = () => useAuthStore((s) => s.user?.avatar);

const useUserAddress = () => useAuthStore((s) => (s.user as any)?.address);
const useUserPostalCode = () => useAuthStore((s) => (s.user as any)?.postalCode);

const useUserSpecialties = () => useAuthStore((s) => (s.user as any)?.specialties);
const useUserYearsOfExperience = () => useAuthStore((s) => (s.user as any)?.yearsOfExperience);
const useUserConsultationFee = () => useAuthStore((s) => (s.user as any)?.consultationFee);

const useCheckAuth = () => useAuthStore((s) => s.checkAuth);
const useIsAdmin = () => useAuthStore((s) => s.user?.role === "admin");

const useAuthActions = () =>
  useAuthStore(
    useShallow((s) => ({
      setUser: s.setUser,
      logout: s.logout,
    })),
  );

export {
  useAuthActions,
  useCheckAuth,
  useIsAdmin,
  useIsAuthenticated,
  useIsLoading,
  useUserAddress,
  useUserAvatar,
  useUserConsultationFee,
  useUserEmail,
  useUserFirstName,
  useUserLastName,
  useUserMobile,
  useUserPostalCode,
  useUserRole,
  useUserSpecialties,
  useUserYearsOfExperience
};

