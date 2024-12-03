import { appReducer, authReducer } from '@/entities'
import { expiredEmailLinkApi, signUpApi, setPasswordApi, signInApi } from '@/features'
import { passwordRecoveryApi } from '@/shared'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(setPasswordApi.middleware)
      .concat(passwordRecoveryApi.middleware)
      .concat(expiredEmailLinkApi.middleware)
      .concat(signInApi.middleware),
  reducer: {
    app: appReducer,
    auth: authReducer,
    [expiredEmailLinkApi.reducerPath]: expiredEmailLinkApi.reducer,
    [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})
