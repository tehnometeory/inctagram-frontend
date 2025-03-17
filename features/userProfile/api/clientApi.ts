import { baseApi } from '@/app'
import { ProfileUserPostsResponse, ProfileUserResponse } from '@/features/userProfile/api/types'

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    myProfile: builder.query<ProfileUserResponse, void>({
      providesTags: ['Profile', 'Post', 'Posts'],
      query: () => ({
        method: 'GET',
        url: 'profile/my-profile',
      }),
    }),
    profileByIdPosts: builder.query<ProfileUserPostsResponse, { id: string; page: number }>({
      providesTags: ['Posts', 'Post'],
      query: ({ id, page }) => ({
        method: 'GET',
        url: `posts/profile-posts/${id}?page=${page}`,
      }),
    }),
    userProfileById: builder.query<ProfileUserResponse, string>({
      providesTags: ['Profile', 'Posts', 'Post'],
      query: id => ({
        method: 'GET',
        url: `profile/${id}`,
      }),
    }),
  }),
})

export const { useMyProfileQuery, useProfileByIdPostsQuery, useUserProfileByIdQuery } =
  userProfileApi
