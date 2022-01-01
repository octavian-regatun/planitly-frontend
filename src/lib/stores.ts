import create from "zustand";
import { User } from "../interfaces/user.interface";
import { fetchUser } from "./fetchUser";
import { devtools } from "zustand/middleware";

interface UserStore {
  user?: User;
  getUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>(
  devtools((set) => ({
    user: undefined,
    getUser: async (id: string) => {
      const user = (await fetchUser(id)) as User;
      set({ user });
    },
  }))
);
