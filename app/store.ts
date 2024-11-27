import { appReducer } from '@/entities/app'
import { expiredEmailLinkApi } from '@/features'
import { passwordRecoveryApi } from '@/features/ForgotPassword/api'
import { signUpApi } from '@/features/SignUp/api/signUpApi'
import { setPasswordApi } from '@/features/newPassword/model/api'
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
