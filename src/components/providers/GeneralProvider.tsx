import { AuthUser } from "@/features/user/types/user.types";
import AuthProvider from "./AuthProvider";
import NavigationProgressProvider from "./NavigationProgressProvider";
import ThemeInitializer from "./ThemeInitializer";

interface GeneralProviderProps {
  children: React.ReactNode;
  initialUser: Omit<AuthUser, "password"> | null;
}

export default function GeneralProvider({
  children,
  initialUser,
}: GeneralProviderProps) {
  return (
    <AuthProvider initialUser={JSON.parse(JSON.stringify(initialUser))}>
      <ThemeInitializer />
      <NavigationProgressProvider>{children}</NavigationProgressProvider>
    </AuthProvider>
  );
}
