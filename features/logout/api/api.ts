import { Endpoints, baseApi } from '@/shared'

export const logoutApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation({
      query: () => {
        return {
          method: 'POST',
          url: Endpoints.logout,
        }
      },
    }),
  }),
})

export const { useLogoutMutation } = logoutApi
