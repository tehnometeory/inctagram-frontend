import { ProfileUserPostsResponse, ProfileUserResponse } from '@/features/userProfile/api/types'
import { Endpoints, baseApi } from '@/shared'

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    myProfile: builder.query<ProfileUserResponse, void>({
      providesTags: ['Profile', 'Post', 'Posts'],
      query: () => ({
        method: 'GET',
        url: Endpoints.myProfile,
      }),
    }),
    profileByIdPosts: builder.query<ProfileUserPostsResponse, { id: string; page: number }>({
      providesTags: ['Posts', 'Post'],
      query: ({ id, page }) => ({
        method: 'GET',
        url: `${Endpoints.profilePosts}/${id}?page=${page}`,
      }),
    }),
    userProfileById: builder.query<ProfileUserResponse, string>({
      providesTags: ['Profile', 'Posts', 'Post'],
      query: id => ({
        method: 'GET',
        url: `${Endpoints.profile}/${id}`,
      }),
    }),
  }),
})

export const { useMyProfileQuery, useProfileByIdPostsQuery, useUserProfileByIdQuery } =
  userProfileApi
