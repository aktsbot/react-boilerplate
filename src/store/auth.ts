import { create } from "zustand";

import { TUser } from "@/lib/types";

interface IAuthStoreState {
  accessToken: string;
  refreshToken: string;
  user: TUser | null;
  isLoggedIn: boolean;
}

const useAuthStore = create<IAuthStoreState>((set) => ({
  accessToken: "",
  refreshToken: "",
  user: null,
  isLoggedIn: false,

  setTokensAndLogin: (payload: {
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
  }) => {
    set((state) => ({ ...state, ...payload }));
  },

  clearSession: () => {
    set((state) => ({
      ...state,
      ccessToken: "",
      refreshToken: "",
      user: null,
      isLoggedIn: false,
    }));
  },

  setUser: (user: TUser) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
}));

export default useAuthStore;
