import { appReducer, authReducer } from '@/entities'
import {
  expiredEmailLinkApi,
  forgotPasswordApi,
  setPasswordApi,
  signInApi,
  signUpApi,
} from '@/features'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(setPasswordApi.middleware)
      .concat(forgotPasswordApi.middleware)
      .concat(expiredEmailLinkApi.middleware)
      .concat(signInApi.middleware),
  reducer: {
    app: appReducer,
    auth: authReducer,
    [expiredEmailLinkApi.reducerPath]: expiredEmailLinkApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})
