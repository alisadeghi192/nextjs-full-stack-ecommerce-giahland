import { AuthUser } from "@/features/user/types/user.types";
import AuthProvider from "./AuthProvider";

interface GeneralProviderProps {
  children: React.ReactNode;
  initialUser: Omit<AuthUser , "password"> | null;
}

export default function GeneralProvider({ children, initialUser }: GeneralProviderProps) {

  return (
    <AuthProvider initialUser={JSON.parse(JSON.stringify(initialUser))}>
      {children}
    </AuthProvider>
  );
}