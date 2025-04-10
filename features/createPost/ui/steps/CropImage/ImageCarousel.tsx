/* eslint-disable import/extensions */
import { useState } from 'react'

import { setAspectControl, setZoomControl } from '@/features/createPost/model'
import { ImageDraft } from '@/features/createPost/model/types'
import { useAppDispatch } from '@/shared'
import { ArrowIosBack, ArrowIosForward } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import { Swiper as SwiperInstance } from 'swiper'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import s from './ImageCarousel.module.scss'

import { ImageCrop } from './ImageCrop'

type Props = {
  images: ImageDraft[]
  setActiveSlideIndex: (index: number) => void
  thumbsSwiper: SwiperInstance | null
}

export const ImageCarousel = ({ images, setActiveSlideIndex, thumbsSwiper }: Props) => {
  const [isBegin, setIsBegin] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const showNavigation = images.length > 1

  return (
    <div className={s.carouselContainer}>
      <Swiper
        allowTouchMove={false}
        className={s.swiperMain}
        modules={[Navigation, Pagination, Thumbs]}
        navigation={{
          nextEl: `.${s[`swiperButtonNext`]}`,
          prevEl: `.${s[`swiperButtonPrev`]}`,
        }}
        onSlideChange={swiper => {
          setIsBegin(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
          setActiveSlideIndex(swiper.activeIndex)
          // close all controls without thumbs
          dispatch(setZoomControl(false))
          dispatch(setAspectControl(false))
        }}
        pagination={
          showNavigation && {
            bulletActiveClass: 'swiper-pagination-button-active',
            bulletClass: 'swiper-pagination-button',
            el: `.${s[`swiperPagination`]}`,
            type: 'bullets',
          }
        }
        slidesPerView={1}
        spaceBetween={50}
        speed={0}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image, index) => (
          <SwiperSlide className={s.slide} key={index}>
            <ImageCrop
              aspect={image.aspect}
              id={image.id}
              img={image.originalImage}
              zoom={image.zoom}
            />
          </SwiperSlide>
        ))}
        <div className={clsx(s.swiperButtonNext, (!showNavigation || isEnd) && s.hidden)}>
          <ArrowIosForward fill={'white'} height={24} width={24} />
        </div>

        <div className={clsx(s.swiperButtonPrev, (!showNavigation || isBegin) && s.hidden)}>
          <ArrowIosBack fill={'white'} height={24} width={24} />
        </div>

        <div className={s.swiperPagination} />
      </Swiper>
    </div>
  )
}
