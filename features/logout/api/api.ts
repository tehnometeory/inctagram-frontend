import { BASE_URL_API } from '@/shared'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const logoutApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    credentials: 'include',
    prepareHeaders: headers => {
      headers.set('User-Agent', navigator.userAgent)

      return headers
    },
  }),
  endpoints: builder => ({
    logout: builder.mutation({
      query: () => {
        return {
          method: 'POST',
          url: 'auth/logout',
        }
      },
    }),
  }),
  reducerPath: 'logoutApi',
})

export const { useLogoutMutation } = logoutApi
