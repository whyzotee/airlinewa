import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStateLogin {
  userId: string;
  name: string;
  email: string;
}

interface AuthState {
  login: (data: AuthStateLogin) => void;
  logout: () => void;
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
        logout: () => {
          set({ auth: null });
        },
      }),
      { name: "aitlinewa-auth" }
    )
  )
);

interface PaymentData {
  payment_id: string;
  user_id: string;
  type: string;
  number: string;
  out_date: string;
  cvv: string;
  holder_name: string;
}

interface PaymentStore {
  payment: PaymentData;
  setPayment: (newPayment: Partial<PaymentData>) => void;
  resetPayment: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payment: {
    payment_id: "",
    user_id: "",
    type: "",
    number: "",
    out_date: "",
    cvv: "",
    holder_name: "",
  },
  setPayment: (newPayment) =>
    set((state) => ({
      payment: { ...state.payment, ...newPayment },
    })),
  resetPayment: () =>
    set((state) => ({
      payment: {
        payment_id: state.payment.payment_id,
        user_id: state.payment.user_id,
        type: "",
        number: "",
        out_date: "",
        cvv: "",
        holder_name: "",
      },
    })),
}));
