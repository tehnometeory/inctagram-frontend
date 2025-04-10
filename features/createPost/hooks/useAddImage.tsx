import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'

import { setAlert } from '@/entities'
import { addImage, nextStep } from '@/features/createPost/model'
import { useAppDispatch, useAppSelector } from '@/shared'

export const useAddImage = () => {
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(state => state.createPost.currentPost.currentStep)
  const imageCount = useAppSelector(state => state.createPost.currentPost.images.length)

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        // переделать на модалку или уточнить как нужно
        dispatch(
          setAlert({
            message: 'The photo must be less than 20 Mb and have JPEG or PNG format.',
            type: 'error',
          })
        )

        return
      }

      if (imageCount >= 10) {
        return
      }

      const acceptFiles = acceptedFiles.slice(0, 10 - imageCount)

      acceptFiles.forEach(file => {
        const blobUrl = URL.createObjectURL(file)
        const id = `${Date.now()}-${file.name}`
        // Создаем объект Image, чтобы получить ширину и высоту
        const img = new Image()

        img.onload = () => {
          const { height, width } = img

          dispatch(addImage({ height, id, originalImage: blobUrl, width }))
        }
        img.src = blobUrl
      })
      if (currentStep === 1) {
        dispatch(nextStep())
      }
    },
    [dispatch, currentStep, imageCount]
  )

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxSize: 20 * 1024 * 1024,
    noClick: true,
    onDrop,
  })

  return { getInputProps, getRootProps, isDragActive, open }
}
