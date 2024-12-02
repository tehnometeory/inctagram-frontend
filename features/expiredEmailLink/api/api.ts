import { ResendConfirmationCodeArgs } from '@/features/expiredEmailLink/api/types'
import { BASE_URL_API, ErrorsMessagesResponse } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const expiredEmailLinkApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
  }),
  endpoints: builder => ({
    resendConfirmationCode: builder.mutation<
      ErrorsMessagesResponse | void,
      ResendConfirmationCodeArgs
    >({
      query: ({ email }) => ({
        body: { email },
        method: 'POST',
        url: 'auth/confirmation-code-resend',
      }),
    }),
  }),
  reducerPath: 'expiredEmailLinkApi',
})

export const { useResendConfirmationCodeMutation } = expiredEmailLinkApi
