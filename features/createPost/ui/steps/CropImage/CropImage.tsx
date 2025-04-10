import { useState } from 'react'

import { useAppSelector } from '@/shared'
import { Swiper as SwiperInstance } from 'swiper'

import s from './CropImage.module.scss'

import { AspectControl } from './AspectControl'
import { ImageCarousel } from './ImageCarousel'
import { ThumbnailCarousel } from './ThumbnailCarousel'
import { ZoomControl } from './ZoomControl'

export const CropImage = () => {
  const images = useAppSelector(state => state.createPost.currentPost.images)

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

  if (!images.length) {
    return null
  }

  const activeImage = images[activeSlideIndex]

  return (
    <div className={s.cropWrapper}>
      <ImageCarousel
        images={images}
        setActiveSlideIndex={setActiveSlideIndex}
        thumbsSwiper={thumbsSwiper}
      />
      <ThumbnailCarousel
        activeSlideIndex={activeSlideIndex}
        images={images}
        setThumbsSwiper={setThumbsSwiper}
      />
      {activeImage && <ZoomControl imageId={activeImage.id} zoom={activeImage.zoom} />}
      {activeImage && (
        <AspectControl
          aspect={activeImage.aspect}
          height={activeImage.height}
          imageId={activeImage.id}
          width={activeImage.width}
        />
      )}
    </div>
  )
}
