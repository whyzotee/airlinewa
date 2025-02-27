import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CheckoutUserState {
    step: number;
    formData: {
        name: string;
        lastname: string;
        gender: string;
        country: string;
        birthday: string;
        identityType: {
            type: string,
            number: string,
            out_date: string,
        };
    };
}

const initialState = {
    step: 1,
    formData: {
        name: "",
        lastname: "",
        gender: "",
        country: "",
        birthday: "",
        identityType: {
            type: "",
            number: "",
            out_date: "",
        },
    },
} as CheckoutUserState;

const checkoutUserSlice = createSlice({
    name: "checkoutUser",
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        updateFormData: (state, action: PayloadAction<Partial<CheckoutUserState["formData"]>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetForm: (state) => {
            state.formData = initialState.formData;
        },
    },
});

export const { setStep, updateFormData, resetForm } = checkoutUserSlice.actions;
export default checkoutUserSlice.reducer;

