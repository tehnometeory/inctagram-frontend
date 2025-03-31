import { ProfileUserPostsResponse, ProfileUserResponse } from '@/features/userProfile/api/types'
import { baseApi, Endpoints } from '@/shared'

export const userAvatarApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<ProfileUserPostsResponse, { id: string }>({
      invalidatesTags: ['Profile'],
      query: ({ id }) => ({
        body: { id },
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
