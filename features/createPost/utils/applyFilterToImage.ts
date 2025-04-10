export const applyFilterToImage = (imageSrc: string, filter: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (filter === 'none') {
      resolve(imageSrc)

      return
    }

    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return reject(new Error('Failed to get 2D context'))
      }

      canvas.width = image.width
      canvas.height = image.height

      ctx.filter = filter

      ctx.drawImage(image, 0, 0)
      resolve(canvas.toDataURL('image/jpeg'))
    }

    image.onerror = error => {
      reject(new Error(`Failed to load image: ${error}`))
    }
  })
}
