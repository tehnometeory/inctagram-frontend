import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AddImagePayload, CreatePostState } from './types'

const initialState: CreatePostState = {
  currentPost: {
    currentStep: 1,
    description: '',
    images: [],
  },
  draft: null,
  isAspectControlOpen: false,
  isModalCancelPostOpen: false,
  isModalOpen: false,
  isThumbnailsControlOpen: false,
  isZoomControlOpen: false,
}

export const createPostSlice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    addImage(state, action: PayloadAction<AddImagePayload>) {
      const { originalImage } = action.payload
      const image = {
        ...action.payload,
        activeFilter: 'none',
        aspect: 1,
        croppedImage: originalImage,
        filteredImage: '',
        zoom: 1,
      }

      state.currentPost.images.push(image)
    },
    clearDraft(state) {
      state.draft = null
    },

    hideCancelPostModal(state) {
      state.isModalCancelPostOpen = false
    },
    hideModal(state) {
      state.isModalOpen = false
    },
    loadDraft(state) {
      if (state.draft) {
        state.currentPost = { ...state.draft }
      }
    },
    nextStep(state) {
      state.currentPost.currentStep += 1
    },
    prevStep(state) {
      if (state.currentPost.currentStep > 1) {
        state.currentPost.currentStep -= 1
      }
    },
    removeImage(state, action: PayloadAction<string>) {
      const imageToRemove = state.currentPost.images.find(image => image.id === action.payload)

      if (imageToRemove) {
        const { croppedImage, filteredImage, originalImage } = imageToRemove

        if (originalImage) {
          URL.revokeObjectURL(originalImage)
        }
        if (croppedImage) {
          URL.revokeObjectURL(croppedImage)
        }
        if (filteredImage) {
          URL.revokeObjectURL(filteredImage)
        }
        state.currentPost.images = state.currentPost.images.filter(
          image => image.id !== action.payload
        )
      }
    },
    resetCurrentPost(state) {
      state.currentPost.images.forEach(image => {
        const { croppedImage, filteredImage, originalImage } = image

        if (originalImage) {
          URL.revokeObjectURL(originalImage)
        }
        if (croppedImage) {
          URL.revokeObjectURL(croppedImage)
        }
        if (filteredImage) {
          URL.revokeObjectURL(filteredImage)
        }
      })
      state.currentPost.currentStep = 1
      state.currentPost.description = ''
      state.currentPost.images = []
    },
    saveDraft(state) {
      state.draft = { ...state.currentPost }
    },
    setActiveFilter(state, action: PayloadAction<{ filter: string; id: string }>) {
      const { filter, id } = action.payload

      state.currentPost.images = state.currentPost.images.map(image =>
        image.id === id ? { ...image, activeFilter: filter } : image
      )
    },
    setAspect(state, action: PayloadAction<{ aspect: number; id: string }>) {
      const { aspect, id } = action.payload

      state.currentPost.images = state.currentPost.images.map(image =>
        image.id === id ? { ...image, aspect: aspect } : image
      )
    },
    setAspectControl(state, action: PayloadAction<boolean>) {
      state.isAspectControlOpen = action.payload
    },
    setThumbnailsControl(state, action: PayloadAction<boolean>) {
      state.isThumbnailsControlOpen = action.payload
    },
    setZoom(state, action: PayloadAction<{ id: string; zoom: number }>) {
      const { id, zoom } = action.payload

      state.currentPost.images = state.currentPost.images.map(image =>
        image.id === id ? { ...image, zoom: zoom } : image
      )
    },
    setZoomControl(state, action: PayloadAction<boolean>) {
      state.isZoomControlOpen = action.payload
    },
    showCancelPostModal(state) {
      state.isModalCancelPostOpen = true
    },
    showModal(state) {
      state.isModalOpen = true
    },
    updateCroppedImage(state, action: PayloadAction<{ croppedImage: string; id: string }>) {
      const { croppedImage, id } = action.payload

      state.currentPost.images = state.currentPost.images.map(image =>
        image.id === id ? { ...image, croppedImage: croppedImage } : image
      )
    },
    updateDescription(state, action: PayloadAction<{ newDescription: string }>) {
      state.currentPost.description = action.payload.newDescription
    },
    updateFilteredImage(state, action: PayloadAction<{ filteredImage: string; id: string }>) {
      const { filteredImage, id } = action.payload

      state.currentPost.images = state.currentPost.images.map(image =>
        image.id === id ? { ...image, filteredImage: filteredImage } : image
      )
    },
  },
})

export const {
  addImage,
  clearDraft,
  hideCancelPostModal,
  hideModal,
  loadDraft,
  nextStep,
  prevStep,
  removeImage,
  resetCurrentPost,
  saveDraft,
  setActiveFilter,
  setAspect,
  setAspectControl,
  setThumbnailsControl,
  setZoom,
  setZoomControl,
  showCancelPostModal,
  showModal,
  updateCroppedImage,
  updateDescription,
  updateFilteredImage,
} = createPostSlice.actions

export const createPostReducer = createPostSlice.reducer
