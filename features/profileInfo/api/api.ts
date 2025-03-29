import { ProfileInfoResponse, ProfileUpdateArgs } from './types'
import { baseApi, Endpoints } from '@/shared'

export const profileInfoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation<ProfileInfoResponse, ProfileUpdateArgs>({
      query: profileData => ({
        url: Endpoints.updateProfileInfo,
        method: 'POST',
        body: profileData,
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = profileInfoApi
