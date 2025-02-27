import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
    prefix: string;
    name: string;
    lastname: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
}

const initialState = {
    prefix: "",
    name: "",
    lastname: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
} as ContactState

const checkoutContactSlice = createSlice({
    name: "checkoutContact",
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<Partial<ContactState>>) => {
            return { ...state, ...action.payload };
        },
        resetForm: () => {
            return initialState;
        },
    },
});

export const { updateFormData, resetForm } = checkoutContactSlice.actions;
export default checkoutContactSlice.reducer;