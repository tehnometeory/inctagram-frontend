import { baseApi } from '@/app'
import { PostType } from '@/shared'

export const getPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePostById: builder.mutation<void, string>({
      invalidatesTags: ['Post'],
      query: id => ({
        method: 'DELETE',
        url: `posts/${id}`,
      }),
    }),
    getPostById: builder.query<PostType, string>({
      query: id => `posts/${id}`,
    }),
    sendNewDescription: builder.mutation<PostType, { description: string; id: string }>({
      invalidatesTags: ['Post'],
      query: ({ description, id }) => {
        return {
          body: { description },
          method: 'PUT',
          url: `posts/${id}`,
        }
      },
    }),
  }),
})

export const { useDeletePostByIdMutation, useGetPostByIdQuery, useSendNewDescriptionMutation } =
  getPostApi
