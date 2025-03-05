import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStateLogin {
  userId: string;
  name: string;
}

interface AuthState {
  login: (data: AuthStateLogin) => void;
  // userId: string | null;
  auth: {
    userId: string;
    name: string;
  } | null;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: null,
        login: (data) => {
          set({ auth: data });
        },
      }),
      { name: "aitlinewa-auth" }
    )
  )
);
