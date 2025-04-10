import { Endpoints, baseApi } from '@/shared'

import { SetPasswordArg, SetPasswordResponse } from './types'

export const setPasswordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    setPassword: builder.mutation<SetPasswordResponse, SetPasswordArg>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: Endpoints.setPassword,
        }
      },
    }),
  }),
})

export const { useSetPasswordMutation } = setPasswordApi
