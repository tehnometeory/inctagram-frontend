import { baseApi } from '@/app'
import { Endpoints, ResponseWithAccessToken } from '@/shared'
import { MeResponseType } from '@/shared/types/UserType'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponseType, void>({
      query: () => Endpoints.me,
    }),
    refreshToken: builder.mutation<ResponseWithAccessToken, void>({
      query: () => ({
        method: 'POST',
        url: Endpoints.refreshToken,
      }),
    }),
  }),
})

export const { useMeQuery, useRefreshTokenMutation } = authApi
