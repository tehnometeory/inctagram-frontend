import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { SetPasswordArg, SetPasswordResponse } from './types'

export const setPasswordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
  }),
  endpoints: builder => ({
    setPassword: builder.mutation<SetPasswordResponse, SetPasswordArg>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'auth/set-password',
        }
      },
    }),
  }),
  reducerPath: 'setPasswordApi',
})

export const { useSetPasswordMutation } = setPasswordApi
