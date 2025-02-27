import { configureStore } from '@reduxjs/toolkit'
import checkoutUserReducer from './reducers/checkoutUser'
import checkoutContactReducer from './reducers/checkoutContact'


export const store = configureStore({
    reducer: {
        checkoutUser: checkoutUserReducer,
        checkoutContact: checkoutContactReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch