import { ProfileUserPostsResponse, ProfileUserResponse } from '@/features/userProfile/api/types'
import { baseApi, Endpoints } from '@/shared'

export const userAvatarApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<ProfileUserPostsResponse, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: 'DELETE',
        url: `${Endpoints.avatarDelete}`,
      }),
    }),
    updateAvatar: builder.mutation<ProfileUserResponse, FormData>({
      invalidatesTags: ['Profile'],
      query: formdata => ({
        body: formdata,
        method: 'POST',
        url: `${Endpoints.avatarUpdate}`,
      }),
    }),
  }),
})

export const { useDeleteAvatarMutation, useUpdateAvatarMutation } = userAvatarApi
