import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RegistrationBody, RegistrationErrorResponse } from './types'

export const signUpApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://auth.tehnom.org/api/v1/auth/' }),
  endpoints: builder => ({
    registration: builder.mutation<RegistrationErrorResponse | void, RegistrationBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'registration',
      }),
    }),
  }),
  reducerPath: 'signUpApi',
})

export const { useRegistrationMutation } = signUpApi
