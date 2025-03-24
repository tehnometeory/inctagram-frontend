import { baseApi } from '@/app'
import { Endpoints, PostType } from '@/shared'

export const getPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePostById: builder.mutation<void, string>({
      invalidatesTags: ['Post'],
      query: id => ({
        method: 'DELETE',
        url: `${Endpoints.posts}/${id}`,
      }),
    }),
    getPostById: builder.query<PostType, string>({
      query: id => `${Endpoints.posts}/${id}`,
    }),
    sendNewDescription: builder.mutation<any, { description: string; id: string }>({
      query: ({ description, id }) => {
        return {
          body: { description },
          method: 'PUT',
          url: `${Endpoints.posts}/${id}`,
        }
      },
    }),
  }),
})

export const { useDeletePostByIdMutation, useGetPostByIdQuery, useSendNewDescriptionMutation } =
  getPostApi
