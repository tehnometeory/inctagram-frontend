import { Nullable } from '@/shared'

export type ImageDraft = {
  activeFilter: string
  aspect: number
  croppedImage: string
  filteredImage: string
  height: number
  id: string
  originalImage: string

  width: number
  zoom: number
}

type Draft = {
  currentStep: number
  description: string
  images: ImageDraft[]
}

export type CreatePostState = {
  currentPost: Draft
  draft: Nullable<Draft>
  isAspectControlOpen: boolean
  isModalCancelPostOpen: boolean
  isModalOpen: boolean
  isThumbnailsControlOpen: boolean
  isZoomControlOpen: boolean
}

export type AddImagePayload = {
  height: number
  id: string
  originalImage: string
  width: number
}
