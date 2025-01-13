import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import { users } from "@/db/users.ts";
import { User } from "@/db/users.ts";

type Store = {
  currentUser: User | null
  isAuthenticated: boolean,
  login: (userData: User) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      login: async (user: User) => {
        const isExistingUser = users.some(({ email, password }) => user.email === email && user.password === password);

        if (isExistingUser) {
          set({ isAuthenticated: true, currentUser: user });
        } else {
          set({ isAuthenticated: false, currentUser: null })
        }
      },
      logout: async () => {
        set({ isAuthenticated: false, currentUser: null })
      }
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
    },
  ),
)
