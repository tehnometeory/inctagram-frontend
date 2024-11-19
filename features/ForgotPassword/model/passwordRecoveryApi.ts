import {
  ResendEmailArgs,
  ResendEmailResponse,
  ValidEmailArgs,
  ValidEmailResponse,
} from '@/features/ForgotPassword/model/passwordRecoveryTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const passwordRecoveryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://auth.tehnom.org/api/v1/auth/' }),
  endpoints: builder => ({
    resendEmail: builder.mutation<ResendEmailResponse, ResendEmailArgs>({
      query: ({ email }) => ({
        body: { email },
        method: 'POST',
        url: 'confirmation-code-resend',
      }),
    }),
    validEmail: builder.mutation<ValidEmailResponse, ValidEmailArgs>({
      query: ({ email, recaptchaValue }) => ({
        body: { email, recaptchaValue },
        method: 'POST',
        url: 'reset-password',
      }),
    }),
  }),
  reducerPath: 'passwordRecoveryApi',
})

export const { useResendEmailMutation, useValidEmailMutation } = passwordRecoveryApi
