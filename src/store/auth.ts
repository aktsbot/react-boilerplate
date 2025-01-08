import { create } from "zustand";

import { TUser } from "@/lib/types";

type TLoginPayload = {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
};

interface IAuthStoreState {
  accessToken: string;
  refreshToken: string;
  user: TUser | null;
  isLoggedIn: boolean;

  setTokensAndLogin: (payload: TLoginPayload) => void;
  clearSession: () => void;
  setUser: (user: TUser) => void;
}

const useAuthStore = create<IAuthStoreState>((set) => ({
  accessToken: "",
  refreshToken: "",
  user: null,
  isLoggedIn: false,

  setTokensAndLogin: (payload: TLoginPayload) => {
    set((state) => ({ ...state, ...payload }));
  },

  clearSession: () => {
    set((state) => ({
      ...state,
      accessToken: "",
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
