import { configureStore } from '@reduxjs/toolkit'
import checkoutUserReducer from '../features/checkout/slices/checkoutUser'
import checkoutContactReducer from '../features/checkout/slices/checkoutContact'


export const store = configureStore({
    reducer: {
        checkoutUser: checkoutUserReducer,
        checkoutContact: checkoutContactReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch