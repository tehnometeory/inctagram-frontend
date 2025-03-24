import { Endpoints, baseApi } from '@/shared'

import { ResetPasswordArgs, ResetPasswordResponse } from './types'

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordArgs>({
      query: ({ email, recaptchaValue }) => ({
        body: { email, recaptchaValue },
        method: 'POST',
        url: Endpoints.resetPassword,
      }),
    }),
  }),
})

export const { useResetPasswordMutation } = forgotPasswordApi
