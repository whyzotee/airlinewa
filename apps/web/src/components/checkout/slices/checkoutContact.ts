import { isDev } from "@/utils";
import { faker } from "@faker-js/faker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkoutContactForm } from "../validation";

interface ContactState {
  contactData: {
    prefix: string;
    name: string;
    lastname: string;
    email: string;
    country_code: string;
    phone_number: string;
  };
  isValid: boolean;
}

const initialState = {
  contactData: {
    prefix: "",
    name: isDev ? faker.person.firstName() : "",
    lastname: isDev ? faker.person.lastName() : "",
    email: isDev ? faker.internet.email() : "",
    country_code: "",
    phone_number: isDev ? faker.phone.number() : "",
  },
  isValid: false,
} as ContactState;

const checkoutContactSlice = createSlice({
  name: "checkoutContact",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<Partial<ContactState["contactData"]>>
    ) => {
      state.contactData = { ...state.contactData, ...action.payload };
      state.isValid = checkoutContactForm.safeParse(state.contactData).success;
    },
    resetContactForm: (state) => {
      state.isValid = false;
      state.contactData = initialState.contactData;
    },
  },
});

export const { updateFormData, resetContactForm } =
  checkoutContactSlice.actions;
export default checkoutContactSlice.reducer;
