import { URLData, User } from "@/types";
import { create } from "zustand";

export type Action = {
  generateUrl: (url: string) => void;
  deleteUrl: (url: string) => void;
};

type Auth = {
  email: string;
  password?: string;
  otp?: string | number;
};
type StoreState = {
  urls: URLData[];
  user: User | null;
  auth: Auth | null; // Assuming auth is a string, adjust as necessary
  // generateUrl: (url: string) => void;
  // deleteUrl: (url: string) => void;
  updateUser: (user: User | null) => void;
  updateAuth: (auth: Auth | null) => void;
};

export const useStore = create<StoreState>()((set) => ({
  urls: [],
  user: null,
  auth: null,
  // generateUrl: (_url: string) => {
  //   // Implementation goes here
  // },
  // deleteUrl: (_url: string) => {
  //   // Implementation goes here
  // },
  updateUser: (user: User | null) => set({ user }),
  setUrls: (urls: URLData[]) => set({ urls }),
  updateAuth: (auth: Auth | null) => set({ auth }),
}));
