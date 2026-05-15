import { create } from "zustand";
import { IAuthState } from "@/features/auth/types/auth.types";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { signoutAction } from "@/features/auth/actions/signout.actions";

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

 logout: async () => {  
    await signoutAction();  
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    try {
      const { user } = await getMeAction();
      set({
        user: user || null,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));