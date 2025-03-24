import { baseApi } from '@/app'
import { Endpoints } from '@/shared'

import { LoginBody, SignInResponse } from './types'

export const signInApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<SignInResponse, LoginBody>({
      query: body => ({
        body,
        method: 'POST',
        url: Endpoints.login,
      }),
    }),
  }),
})

export const { useLoginMutation } = signInApi
