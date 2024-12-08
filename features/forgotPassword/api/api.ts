import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ResetPasswordArgs, ResetPasswordResponse } from './types'

export const forgotPasswordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: headers => {
      headers.set('Content-type', 'application/json; charset=utf-8')
    },
  }),
  endpoints: builder => ({
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordArgs>({
      query: ({ email, recaptchaValue }) => ({
        body: { email, recaptchaValue },
        method: 'POST',
        url: 'auth/reset-password',
      }),
    }),
  }),
  reducerPath: 'forgotPasswordApi',
})

export const { useResetPasswordMutation } = forgotPasswordApi
