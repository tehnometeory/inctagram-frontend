import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LoginBody, SignInResponse } from './types'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: builder => ({
    login: builder.mutation<SignInResponse, LoginBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
  }),
  reducerPath: 'signInApi',
})

export const { useLoginMutation } = signInApi
