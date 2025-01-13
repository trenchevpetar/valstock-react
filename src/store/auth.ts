import { persist } from "zustand/middleware";
import { create } from "zustand/react";

import { users, User } from "@/db/users.ts";

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
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            const isExistingUser = users.some(({ email, password }) => user.email === email && user.password === password);

            if (isExistingUser) {
              set({ isAuthenticated: true, currentUser: user });
              resolve();
            } else {
              set({ isAuthenticated: false, currentUser: null })
              reject();
            }
          }, 1000)
        })
      },
      logout: async () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            set({ isAuthenticated: false, currentUser: null })
            resolve();
          }, 1000)
        })
      }
    }),
    {
      name: 'auth-storage',
    },
  ),
)
