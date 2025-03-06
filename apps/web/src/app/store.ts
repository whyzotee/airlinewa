import { configureStore } from '@reduxjs/toolkit'
import checkoutContactReducer from '../components/checkout/slices/checkoutContact'
import checkoutUserReducer from '../components/checkout/slices/checkoutUser'


export const store = configureStore({
    reducer: {
        checkoutUser: checkoutUserReducer,
        checkoutContact: checkoutContactReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch