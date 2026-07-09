import { useAuthStore } from "@/stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";


const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
const useIsLoading = () => useAuthStore((s) => s.isLoading);
const useUserRole = () => useAuthStore((s) => s.user?.role);
const useUserId = () => useAuthStore((s) => s.user?._id);
const useUserMobile = () => useAuthStore((s) => s.user?.mobile);
const useUserEmail = () => useAuthStore((s) => s.user?.email);
const useUserFirstName = () => useAuthStore((s) => s.user?.firstName);
const useUserLastName = () => useAuthStore((s) => s.user?.lastName);
const useUserAvatar = () => useAuthStore((s) => s.user?.avatar);

const useUserAddress = () => useAuthStore((s) => (s.user as any)?.address);
const useUserPostalCode = () => useAuthStore((s) => (s.user as any)?.postalCode);
const useUserWishlist = () => useAuthStore((s) => (s.user as any)?.wishlist);

const useUserSpecialties = () => useAuthStore((s) => (s.user as any)?.specialties);
const useUserYearsOfExperience = () => useAuthStore((s) => (s.user as any)?.yearsOfExperience);
const useUserConsultationFee = () => useAuthStore((s) => (s.user as any)?.consultationFee);
const useUserSuccessfulConsultations = () => useAuthStore((s) => (s.user as any)?.successfulConsultations);
const useUserArticles = () => useAuthStore((s) => (s.user as any)?.articles);
const useUserConsultations = () => useAuthStore((s) => (s.user as any)?.consultations);

const useCheckAuth = () => useAuthStore((s) => s.checkAuth);
const useIsAdmin = () => useAuthStore((s) => s.user?.role === "admin");
const useIsPlantDoctor = () => useAuthStore((s) => s.user?.role === "plant-doctor");

const useUserBasicInfo = () =>
  useAuthStore(
    useShallow((s) => ({
      _id: s.user?._id,
      role: s.user?.role,
      mobile: s.user?.mobile,
      email: s.user?.email,
      firstName: s.user?.firstName,
      lastName: s.user?.lastName,
      avatar: s.user?.avatar,
      address: (s.user as any)?.address,
      isAuthenticated: s.isAuthenticated,
    })),
  );

const useUserProfile = () =>
  useAuthStore(
    useShallow((s) => ({
      firstName: s.user?.firstName,
      lastName: s.user?.lastName,
      mobile: s.user?.mobile,
      email: s.user?.email,
      avatar: s.user?.avatar,
      address: (s.user as any)?.address,
      role: s.user?.role,
    })),
  );

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
  useIsPlantDoctor,
  useUserAddress,
  useUserArticles,
  useUserAvatar,
  useUserBasicInfo,
  useUserConsultationFee,
  useUserConsultations,
  useUserEmail,
  useUserFirstName,
  useUserId,
  useUserLastName,
  useUserMobile,
  useUserPostalCode,
  useUserProfile,
  useUserRole,
  useUserSpecialties,
  useUserSuccessfulConsultations,
  useUserWishlist,
  useUserYearsOfExperience
};

