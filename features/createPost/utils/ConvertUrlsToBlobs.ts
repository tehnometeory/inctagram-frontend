import { ImageDraft } from '../model/types'

export const convertUrlsToBlobs = async (images: ImageDraft[], description?: string) => {
  const formData = new FormData()

  formData.append('description', description || '')
  const blobs = await Promise.all(
    images.map(url => fetch(url.filteredImage).then(response => response.blob()))
  )

  blobs.forEach(blob => {
    formData.append('files', blob)
  })

  return formData
}
