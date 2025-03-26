import { Endpoints, baseApi } from '@/shared'

import { GetPosts, PostResponse, Publish } from './types'

export const publishPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNewestPosts: builder.query<PostResponse<Publish>, void>({
      query: () => Endpoints.newestPosts,
    }),
    publishPost: builder.mutation<PostResponse<GetPosts>, FormData>({
      invalidatesTags: ['Post'],
      query: post => {
        return {
          body: post,
          method: 'POST',
          url: Endpoints.posts,
        }
      },
    }),
  }),
})

export const { useGetNewestPostsQuery, usePublishPostMutation } = publishPostApi
