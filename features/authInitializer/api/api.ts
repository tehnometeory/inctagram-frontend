import { Endpoints, ResponseWithAccessToken, baseApi } from '@/shared'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    refreshToken: builder.mutation<ResponseWithAccessToken, void>({
      query: () => ({
        method: 'POST',
        url: Endpoints.refreshToken,
      }),
    }),
  }),
})

export const { useRefreshTokenMutation } = authApi
