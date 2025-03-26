import { Endpoints, ErrorsMessagesResponse, baseApi } from '@/shared'

export type ResendConfirmationCodeArgs = {
  email: string
}

export const expiredEmailLinkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    resendConfirmationCode: builder.mutation<
      ErrorsMessagesResponse | void,
      ResendConfirmationCodeArgs
    >({
      query: ({ email }) => ({
        body: { email },
        method: 'POST',
        url: Endpoints.confirmationCodeResend,
      }),
    }),
  }),
})

export const { useResendConfirmationCodeMutation } = expiredEmailLinkApi
