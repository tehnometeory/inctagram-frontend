import { useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import {
  setAspectControl,
  setThumbnailsControl,
  setZoomControl,
  updateCroppedImage,
} from '@/features/createPost/model'
import { getCroppedImg } from '@/features/createPost/utils/GetCroppedImg'
import { useAppDispatch } from '@/shared'

import s from './ImageCrop.module.scss'

type Props = {
  aspect?: any
  cropInit?: Point
  id: string
  img: string
  zoom?: any
}

const getObjectFit = (aspect: number) => {
  switch (aspect) {
    case 1 / 1:
      return 'cover'
    case 4 / 5:
      return 'vertical-cover'
    case 16 / 9:
      return 'horizontal-cover'
    default:
      return 'contain'
  }
}

export const ImageCrop = ({ aspect = 1, cropInit = { x: 0, y: 0 }, id, img, zoom = 1 }: Props) => {
  const [crop, setCrop] = useState(cropInit)
  const dispatch = useAppDispatch()

  if (!img) {
    return null
  }

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    // checking the correctness of crop values
    if (
      isNaN(croppedAreaPixels.x) ||
      isNaN(croppedAreaPixels.y) ||
      croppedAreaPixels.width <= 0 ||
      croppedAreaPixels.height <= 0
    ) {
      return
    }

    // save cropped image to Redux
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels)

      dispatch(
        updateCroppedImage({
          croppedImage: croppedImage,
          id,
        })
      )
    } catch (error) {
      console.error('Ошибка обрезки изображения:', error)
    }
  }

  const onInteractionStart = () => {
    dispatch(setZoomControl(false))
    dispatch(setAspectControl(false))
    dispatch(setThumbnailsControl(false))
  }

  return (
    <div className={s.cropper}>
      <Cropper
        aspect={aspect}
        crop={crop}
        image={img}
        objectFit={getObjectFit(aspect)}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onInteractionStart={onInteractionStart}
        zoom={zoom}
      />
    </div>
  )
}
