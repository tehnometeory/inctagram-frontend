import { passwordRecoveryApi } from '@/features/ForgotPassword/model'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(passwordRecoveryApi.middleware),
  reducer: {
    [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
