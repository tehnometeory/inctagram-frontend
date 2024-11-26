import { signInApi } from '@/features/SignIn/api'
import { signUpApi } from '@/features/SignUp/api/signUpApi'
import { setPasswordApi } from '@/features/new-password/model/api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(setPasswordApi.middleware)
      .concat(signInApi.middleware),
  reducer: {
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
