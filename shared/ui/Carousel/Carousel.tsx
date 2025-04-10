'use client'

import { useCallback } from 'react'

import { useAppSelector } from '@/shared'
import { ArrowIosBack, ArrowIosForward } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './Carousel.module.scss'

type Props = {
  activeSlide?: number
  images: string[]
  miniVersion?: boolean
  passActiveSlide?: (index: number) => void
}

export const Carousel = ({ activeSlide = 0, images, miniVersion, passActiveSlide }: Props) => {
  const activeFilter = useAppSelector(
    state => state.createPost.currentPost.images[activeSlide]?.activeFilter
  )
  const currentStep = useAppSelector(state => state.createPost.currentPost.currentStep)

  const handleSlideChange = useCallback(
    (swiper: any) => {
      if (passActiveSlide) {
        passActiveSlide(swiper.activeIndex)
      }
    },
    [passActiveSlide]
  )
  const shouldShowNavigation = images.length > 1

  return (
    <div style={{ height: miniVersion ? 240 : 503, width: miniVersion ? 234 : 490 }}>
      <Swiper
        loop={shouldShowNavigation}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: `.${styles[`swiperButtonNext`]}`,
          prevEl: `.${styles[`swiperButtonPrev`]}`,
        }}
        onSlideChange={swiper => {
          handleSlideChange(swiper)
        }}
        pagination={
          shouldShowNavigation && {
            bulletActiveClass: 'swiper-pagination-button-active',
            bulletClass: 'swiper-pagination-button',
            el: `.${styles[`swiperPagination`]}`,
            type: 'bullets',
          }
        }
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                height: miniVersion ? 240 : 503,
                position: 'relative',
                width: miniVersion ? 234 : 490,
              }}
            >
              <Image
                alt={`Image ${index + 1}`}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes={'(max-width: 600px) 100vw, 490px'}
                src={src}
                style={{
                  filter: currentStep === 3 && index === activeSlide ? activeFilter : 'none',
                  objectFit: 'cover',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
        {shouldShowNavigation && (
          <>
            <div className={clsx(styles[`swiperButtonNext`])}>
              <ArrowIosForward
                className={styles[`swiperNextIcon`]}
                fill={'white'}
                height={miniVersion ? 24 : 48}
                width={miniVersion ? 24 : 48}
              />
            </div>
            <div className={styles.swiperButtonPrev}>
              <ArrowIosBack
                className={styles[`swiperPrevIcon`]}
                fill={'white'}
                height={miniVersion ? 24 : 48}
                width={miniVersion ? 24 : 48}
              />
            </div>

            <div
              className={clsx(styles.swiperPagination, miniVersion && styles.swiperPaginationMini)}
            />
          </>
        )}
      </Swiper>
    </div>
  )
}
