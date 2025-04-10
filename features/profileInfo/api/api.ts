import { baseApi, Endpoints } from '@/shared'

import { ProfileInfoResponse, ProfileUpdateArgs } from './types'

export const profileInfoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation<ProfileInfoResponse, ProfileUpdateArgs>({
      invalidatesTags: ['Profile', 'Post', 'Posts'],
      query: profileData => ({
        url: Endpoints.updateProfileInfo,
        method: 'POST',
        body: profileData,
      }),
    }),
  }),
})

export const { useUpdateProfileMutation } = profileInfoApi
