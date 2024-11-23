import { BASE_URL_API } from '@/shared'
import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ErrorResponse, SetPasswordArg, SetPasswordResponse } from './types'

export const setPasswordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: headers => {
      headers.set('Content-type', 'application/json; charset=utf-8')
    },
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
      transformErrorResponse: (error: FetchBaseQueryError, _meta, _arg): { message: string } => {
        const errorData = error.data as ErrorResponse | undefined

        if (error.status === 404 || error.status === 'PARSING_ERROR') {
          return { message: 'User are not registered in system.' }
        }
        if (error.status === 400) {
          const detailedErrors = errorData?.errorsMessages

          if (detailedErrors && detailedErrors.length > 0) {
            const messages = detailedErrors.map(e => `${e.field}: ${e.message}`).join('; ')

            return { message: `Validation error! ${messages}` }
          }

          return { message: 'InputModel has incorrect values or code is not valid or expired.' }
        }
        if (error.status === 500) {
          return { message: 'Server error. Please try again later.' }
        }
        if (error.status === 'FETCH_ERROR') {
          return { message: 'Network error. Please check your connection.' }
        }
        if (error.status === 'CUSTOM_ERROR') {
          return { message: error.data as string }
        }

        return { message: 'An unknown error occurred.' }
      },
    }),
  }),
  reducerPath: 'setPasswordApi',
})

export const { useSetPasswordMutation } = setPasswordApi
