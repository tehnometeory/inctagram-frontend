import { appReducer, authReducer } from '@/entities'
import {
  authApi,
  expiredEmailLinkApi,
  forgotPasswordApi,
  logoutApi,
  setPasswordApi,
  signInApi,
  signUpApi,
} from '@/features'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(signUpApi.middleware)
      .concat(setPasswordApi.middleware)
      .concat(forgotPasswordApi.middleware)
      .concat(expiredEmailLinkApi.middleware)
      .concat(signInApi.middleware)
      .concat(logoutApi.middleware),
  reducer: {
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [expiredEmailLinkApi.reducerPath]: expiredEmailLinkApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})
