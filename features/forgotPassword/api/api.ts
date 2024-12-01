import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ValidEmailArgs, ValidEmailResponse } from './types'

export const passwordRecoveryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: headers => {
      headers.set('Content-type', 'application/json; charset=utf-8')
    },
  }),
  endpoints: builder => ({
    validEmail: builder.mutation<ValidEmailResponse, ValidEmailArgs>({
      query: ({ email, recaptchaValue }) => ({
        body: { email, recaptchaValue },
        method: 'POST',
        url: 'auth/reset-password',
      }),
    }),
  }),
  reducerPath: 'passwordRecoveryApi',
})

export const { useValidEmailMutation } = passwordRecoveryApi
