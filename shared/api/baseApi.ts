import { RootState } from '@/shared'
import { BASE_URL_API } from '@/shared/api/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    credentials: 'include',
    prepareHeaders: (headers, { arg, getState }) => {
      if (typeof arg === 'object' && arg !== null && 'body' in arg) {
        const isFormData = arg.body instanceof FormData

        if (!isFormData && !headers.get('Content-Type')?.includes('multipart/form-data')) {
          headers.set('Content-Type', 'application/json; charset=utf-8')
        }
      }
      const state = getState() as RootState
      const token = state.auth.accessToken

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('User-Agent', navigator.userAgent)

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Post', 'Profile', 'Posts'],
})
