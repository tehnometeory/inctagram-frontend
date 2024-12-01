import { appReducer } from '@/entities'
import { expiredEmailLinkApi, signUpApi } from '@/features'
import { setPasswordApi } from '@/features/newPassword/model/api'
import { passwordRecoveryApi } from '@/shared'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(setPasswordApi.middleware)
      .concat(passwordRecoveryApi.middleware)
      .concat(expiredEmailLinkApi.middleware),
  reducer: {
    app: appReducer,
    [expiredEmailLinkApi.reducerPath]: expiredEmailLinkApi.reducer,
    [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})
