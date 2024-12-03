import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL_API } from '../config'
import { ResetPasswordArgs, ResetPasswordResponse } from './types'

export const passwordRecoveryApi = createApi({
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
  reducerPath: 'passwordRecoveryApi',
})

export const { useResetPasswordMutation } = passwordRecoveryApi
