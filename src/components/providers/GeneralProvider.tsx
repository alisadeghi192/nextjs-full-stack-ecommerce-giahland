import AuthProvider from "./AuthProvider";
import { IUser } from "@/features/user/types/user.types";

interface GeneralProviderProps {
  children: React.ReactNode;
  initialUser: Omit<IUser, "password"> | null;
}

export default function GeneralProvider({ children, initialUser }: GeneralProviderProps) {
  return (
    <AuthProvider initialUser={initialUser}>
      {children}
    </AuthProvider>
  );
}