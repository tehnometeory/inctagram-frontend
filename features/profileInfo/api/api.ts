import { baseApi } from '@/app'
import { ProfileUpdateArgs, ProfileUpdateResponse } from './types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation<ProfileUpdateResponse, ProfileUpdateArgs>({
      query: profileData => ({
        url: '/api/v1/profile/my-profile-data-update',
        method: 'POST',
        body: profileData,
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = profileApi
