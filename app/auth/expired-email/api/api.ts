import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ResendEmailResponse = {
  email: string
}
type ResendEmailArgs = {
  email: string
}
export const passwordRecoveryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: headers => {
      headers.set('Content-type', 'application/json; charset=utf-8')
    },
  }),
  endpoints: builder => ({
    resendEmail: builder.mutation<ResendEmailResponse, ResendEmailArgs>({
      query: ({ email }) => ({
        body: { email },
        method: 'POST',
        url: 'auth/confirmation-code-resend',
      }),
    }),
  }),
  reducerPath: 'passwordRecoveryApi',
})

export const { useResendEmailMutation } = passwordRecoveryApi
