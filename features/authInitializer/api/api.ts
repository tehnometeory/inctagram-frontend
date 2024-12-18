import { BASE_URL_API, ResponseWithAccessToken } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    credentials: 'include',
    prepareHeaders: headers => {
      headers.set('User-Agent', navigator.userAgent)

      return headers
    },
  }),
  endpoints: builder => ({
    refreshTokens: builder.mutation<ResponseWithAccessToken, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/refresh-tokens',
      }),
    }),
  }),
  reducerPath: 'authApi',
})

export const { useRefreshTokensMutation } = authApi
