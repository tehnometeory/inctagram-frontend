export const getCroppedImg = async (
  imageSrc: string,
  crop: {
    height: number
    width: number
    x: number
    y: number
  }
): Promise<string> => {
  const image = await createImage(imageSrc)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to create canvas context')
  }

  // Устанавливаем размеры canvas
  canvas.width = crop.width
  canvas.height = crop.height

  // Рисуем обрезанное изображение
  ctx.drawImage(
    image,
    crop.x, // x-координата обрезки
    crop.y, // y-координата обрезки
    crop.width, // ширина области обрезки
    crop.height, // высота области обрезки
    0, // начальная x-координата на canvas
    0, // начальная y-координата на canvas
    canvas.width, // итоговая ширина canvas
    canvas.height // итоговая высота canvas
  )
  // Возвращаем изображение в формате base64
  // return canvas.toDataURL('image/jpeg')

  // в формате Blob URL
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      if (!file) {
        reject(new Error('Canvas is empty'))

        return
      }
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image at URL: ${url}`))
    img.src = url
  })
}
