import { useCallback } from 'react'

import { useAddImage } from '@/features/createPost/hooks'
import {
  prevStep,
  removeImage,
  setAspectControl,
  setThumbnailsControl,
  setZoomControl,
} from '@/features/createPost/model'
import { ImageDraft } from '@/features/createPost/model/types'
import { useAppDispatch, useAppSelector } from '@/shared'
import {
  CloseOutline,
  ImageIcon,
  ImageIconOutline,
  PlusCircleOutline,
} from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Image from 'next/image'
import { Swiper as SwiperInstance } from 'swiper'
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './ThumbnailCarousel.module.scss'

import { IconButton } from './IconButton'

type Props = {
  activeSlideIndex: number
  images: ImageDraft[]
  setThumbsSwiper: (swiper: SwiperInstance) => void
}

export const ThumbnailCarousel = ({ activeSlideIndex, images, setThumbsSwiper }: Props) => {
  const isThumbnailsControlOpen = useAppSelector(state => state.createPost.isThumbnailsControlOpen)

  const dispatch = useAppDispatch()

  const { getInputProps, getRootProps, open } = useAddImage()
  const imageCount = images.length

  const thumbsButtonHandler = useCallback(() => {
    dispatch(setZoomControl(false))
    dispatch(setAspectControl(false))
    dispatch(setThumbnailsControl(!isThumbnailsControlOpen))
  }, [dispatch, isThumbnailsControlOpen])

  const removeImageHandler = (id: string) => {
    if (imageCount === 1) {
      dispatch(prevStep())
    }
    dispatch(removeImage(id))
    dispatch(setThumbnailsControl(false))
  }

  return (
    <div {...getRootProps} className={s.thumbsControl}>
      <input {...getInputProps()} />

      <div
        className={clsx(
          s.thumbsContainer,
          isThumbnailsControlOpen && s.showThumbs,
          imageCount >= 5 && s.gap
        )}
      >
        <div className={clsx(s.swiperThumbs, imageCount < 10 && s.withAddButton)}>
          <Swiper
            className={'thumbsSwiper'}
            freeMode
            modules={[Navigation, Thumbs, Mousewheel, FreeMode]}
            mousewheel
            onSwiper={setThumbsSwiper}
            slidesPerView={'auto'}
            spaceBetween={12}
          >
            {images.map((image, index) => (
              <SwiperSlide className={s.swiperSlideThumb} key={image.id}>
                <div
                  className={clsx(s.thumbContainer, activeSlideIndex === index && s.activeSlide)}
                >
                  <Image
                    alt={`Image ${index + 1}`}
                    className={clsx(s.image)}
                    fill
                    key={index}
                    src={image.croppedImage || image.originalImage}
                    style={{ objectFit: 'cover' }}
                  />
                  <IconButton
                    className={s.removeButton}
                    onClick={() => removeImageHandler(image.id)}
                  >
                    <CloseOutline fill={'var(--color-light-100'} height={12} width={12} />
                  </IconButton>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {imageCount < 10 && (
          <PlusCircleOutline
            className={s.addImageButton}
            fill={'var(--color-light-100)'}
            height={36}
            onClick={open}
            width={36}
          />
        )}
      </div>

      <IconButton className={s.showThubmsButton} onClick={thumbsButtonHandler}>
        {isThumbnailsControlOpen ? (
          <ImageIcon fill={'var(--color-accent-500)'} height={24} width={24} />
        ) : (
          <ImageIconOutline fill={'var(--color-light-100)'} height={24} width={24} />
        )}
      </IconButton>
    </div>
  )
}
