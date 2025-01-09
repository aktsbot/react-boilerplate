import { create } from "zustand";

import { TUser } from "@/lib/types";

type TLoginPayload = {
  accessToken: string;
  isLoggedIn: boolean;
};

interface IAuthStoreState {
  accessToken: string;
  user: TUser | null;
  isLoggedIn: boolean;
  lastUpdateOn: Date | null;

  setTokenAndLogin: (payload: TLoginPayload) => void;
  clearSession: () => void;
  setUser: (user: TUser) => void;
}

const useAuthStore = create<IAuthStoreState>((set) => ({
  accessToken: "",
  refreshToken: "",
  user: null,
  isLoggedIn: false,
  lastUpdateOn: null,

  setTokenAndLogin: (payload: TLoginPayload) => {
    set((state) => ({ ...state, ...payload, lastUpdateOn: new Date() }));
  },

  clearSession: () => {
    set((state) => ({
      ...state,
      accessToken: "",
      user: null,
      isLoggedIn: false,
      lastUpdateOn: new Date(),
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
