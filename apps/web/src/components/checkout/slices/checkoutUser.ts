import { isDev } from "@/utils";
import { faker } from "@faker-js/faker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkoutUserForm } from "../validation";

interface CheckoutUserState {
  step: number;
  formData: {
    name: string;
    lastname: string;
    gender: string;
    country: string;
    birthday: string;
    identity: {
      type: string;
      number: string;
      out_date: string;
    };
  };
  isValid: boolean;
}

const initialState = {
  step: 1,
  formData: {
    name: isDev ? faker.person.firstName() : "",
    lastname: isDev ? faker.person.lastName() : "",
    gender: "",
    country: "",
    birthday: "",
    identity: {
      type: "id_card",
      number: "",
      out_date: "",
    },
  },
  isValid: false,
} as CheckoutUserState;

const checkoutUserSlice = createSlice({
  name: "checkoutUser",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<CheckoutUserState["formData"]>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
      state.isValid = checkoutUserForm.safeParse(state.formData).success;

      if (state.formData.identity.type == "passport") {
        if (!state.formData.identity.out_date.trim()) {
          state.isValid = false;
        }
      }
    },
    resetUserForm: (state) => {
      state.formData = initialState.formData;
      state.isValid = false;
    },
  },
});

export const { setStep, updateFormData, resetUserForm } =
  checkoutUserSlice.actions;
export default checkoutUserSlice.reducer;
