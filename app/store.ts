import { signUpApi } from '@/features/SignUp/api/signUpApi'
import { setPasswordApi } from '@/features/new-password/model/api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(signUpApi.middleware).concat(setPasswordApi.middleware),
  reducer: {
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
