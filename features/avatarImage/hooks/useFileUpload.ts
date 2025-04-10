import { useCallback, useState } from 'react'
import { FileRejection } from 'react-dropzone'

export const useFileUpload = (minSize: number) => {
  const [imgSrc, setImgSrc] = useState('')
  const [error, setError] = useState('')

  const validateImage = useCallback(
    (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = e => {
          const image = new window.Image()

          image.onload = () => {
            if (image.naturalWidth < minSize || image.naturalHeight < minSize) {
              reject('Image must be at least 192x192 pixels')
            } else {
              resolve(e.target?.result as string)
            }
          }
          image.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
      })
    },
    [minSize]
  )

  const handleFileDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const errorCode = rejectedFiles[0].errors[0].code

        setError(getErrorMessage(errorCode))

        return
      }

      const file = acceptedFiles[0]

      if (!file) {
        return
      }

      try {
        const imageUrl = await validateImage(file)

        setImgSrc(imageUrl)
        setError('')
      } catch (err) {
        setError(err as string)
      }
    },
    [validateImage]
  )

  return { error, handleFileDrop, imgSrc }
}

const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'file-invalid-type':
      return 'Error! The format of the uploaded photo must be JPEG or PNG.'
    case 'file-too-large':
      return 'Error! Photo size must be less than 10MB!'
    default:
      return 'File upload error.'
  }
}
