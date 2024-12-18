import { appReducer, authReducer } from '@/entities'
import {
  authApi,
  expiredEmailLinkApi,
  forgotPasswordApi,
  setPasswordApi,
  signInApi,
  signUpApi,
} from '@/features'
import { rtkQueryErrorLogger } from '@/shared'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      signUpApi.middleware,
      setPasswordApi.middleware,
      forgotPasswordApi.middleware,
      expiredEmailLinkApi.middleware,
      signInApi.middleware,
      rtkQueryErrorLogger
    ),
  reducer: {
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [expiredEmailLinkApi.reducerPath]: expiredEmailLinkApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})
