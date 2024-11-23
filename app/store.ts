import { passwordRecoveryApi } from '@/features/ForgotPassword/api'
import { setPasswordApi } from '@/features/new-password/model/api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(setPasswordApi.middleware).concat(passwordRecoveryApi.middleware),
  reducer: {
    [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
