import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RegistrationBody, RegistrationResponse } from './types'

export const signUpApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: builder => ({
    registration: builder.mutation<RegistrationResponse, RegistrationBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/registration',
      }),
    }),
    registrationViaGitHub: builder.query<void, void>({
      query: () => ({
        url: 'oauth/github/login',
      }),
    }),
    registrationViaGoogle: builder.query<void, void>({
      query: () => ({
        url: 'oauth/google/login',
      }),
    }),
  }),
  reducerPath: 'signUpApi',
})

export const {
  useLazyRegistrationViaGitHubQuery,
  useLazyRegistrationViaGoogleQuery,
  useRegistrationMutation,
} = signUpApi
