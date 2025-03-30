import React, { useRef, useState } from 'react'
import {
  PercentCrop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop'

import { SetCanvasPreview } from '../utils/SetCanvasPreview'

export const useImageCrop = (MIN_DIMENSION: number, ASPECT_RATIO: number) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = useState<PercentCrop | PixelCrop>()

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { height, width } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)

    setCrop(centeredCrop)
  }

  const handleCropComplete = async () => {
    if (!previewCanvasRef.current || !imgRef.current || !crop) {
      return
    }

    SetCanvasPreview({
      canvas: previewCanvasRef.current,
      crop: convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      image: imgRef.current,
    })

    const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.9)
    const blob = await (await fetch(dataUrl)).blob()

    return { blob, dataUrl }
  }

  return {
    crop,
    handleCropComplete,
    imgRef,
    onImageLoad,
    previewCanvasRef,
    setCrop,
  }
}
