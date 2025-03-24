import { Endpoints, MeResponseType, baseApi } from '@/shared'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponseType, void>({
      query: () => Endpoints.me,
    }),
  }),
})

export const { useMeQuery } = userApi
