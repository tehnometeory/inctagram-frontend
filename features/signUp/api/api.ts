import { Endpoints, baseApi } from '@/shared'

import { RegistrationBody, RegistrationResponse } from './types'

export const signUpApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registration: builder.mutation<RegistrationResponse, RegistrationBody>({
      query: body => ({
        body,
        method: 'POST',
        url: Endpoints.registration,
      }),
    }),
  }),
})

export const { useRegistrationMutation } = signUpApi
