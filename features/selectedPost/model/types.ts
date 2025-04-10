import { ErrorsMessagesResponse, Nullable, PostType } from '@/shared'

export type PostResponse<T> = ErrorsMessagesResponse | T

export type SelectedPostState = {
  isEditing: boolean
  isModalOpen: boolean
  post: Nullable<PostType>
}
