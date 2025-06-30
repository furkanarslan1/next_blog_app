import { create } from "zustand";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  avatarUrl: string | null;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useauthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
