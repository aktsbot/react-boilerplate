import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type TAlertMessage = {
  text: string;
  type?: "error" | "success" | "warning" | "info";
  id: string;
};

interface IGeneralStoreState {
  alertMessages: TAlertMessage[];
  addAlertMessage: (payload: TAlertMessage) => void;
  removeAlertMessage: (id: string) => void;
}

const useGeneralStore = create<IGeneralStoreState>((set, get) => ({
  alertMessages: [],
  addAlertMessage: (payload: Omit<TAlertMessage, "id">) => {
    const message = {
      id: uuidv4(),
      ...payload,
    };
    const allMessages = get().alertMessages;
    allMessages.push(message);
    set((state) => ({ ...state, alertMessages: allMessages }));
  },
  removeAlertMessage: (id: string) => {
    const allMessages = get().alertMessages.filter((m) => m.id !== id);
    set((state) => ({ ...state, alertMessages: allMessages }));
  },
}));

export default useGeneralStore;
