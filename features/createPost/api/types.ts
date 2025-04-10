import { ErrorsMessagesResponse } from '@/shared'

export type PostResponse<T> = ErrorsMessagesResponse | T

export type Publish = {
  id: string
}

export type GetPosts = [
  {
    createdAt: string
    description: string
    id: string
    photos: {
      createdAt: string
      id: string
      postId: string
      url: string
    }
    privateStatus: string
    updatedAt: string
    user: {
      username: string
    }
    userId: string
  },
]
