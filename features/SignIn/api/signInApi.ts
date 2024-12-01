import { BASE_URL_API, ErrorsMessagesResponse } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AuthResponse, LoginBody } from './types'

export const signInApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    loginViaGitHub: builder.query<any, any>({
      query: () => ({
        url: 'oauth/google/login',
      }),
    }),
    loginViaGoogle: builder.query<any, any>({
      query: () => ({
        url: 'oauth/google/login',
      }),
    }),
  }),
  reducerPath: 'signInApi',
})

export const { useLazyLoginViaGitHubQuery, useLazyLoginViaGoogleQuery, useLoginMutation } =
  signInApi
