import React, { useState } from 'react'

import { ArrowIosBack, ArrowIosBackOutline, ArrowIosForward } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './Carousel.module.scss'

type Props = {
  images: string[]
  type: 'Black' | 'Gray'
}
export const Carousel = ({ images, type }: Props) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  return (
    <div className={styles.container}>
      <Swiper
        loop={false} // Отключаем зацикливание
        modules={[Navigation, Pagination]} // Подключаем модули
        navigation={{
          nextEl: `.${styles[`swiperButtonNext${type}`]}`,
          prevEl: `.${styles[`swiperButtonPrev${type}`]}`,
        }} // Включаем стрелки
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
        pagination={{
          bulletActiveClass: 'swiper-pagination-button-active',
          bulletClass: 'swiper-pagination-button',
          clickable: true,
          el: `.${styles[`swiperPagination${type}`]}`,
          type: 'bullets',
        }} // Кликабельные точки
        slidesPerView={1}
        spaceBetween={50}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div style={{ height: '503px', position: 'relative', width: '490px' }}>
              <Image
                alt={`Image ${index + 1}`}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes={'(max-width: 490px) 100vw, 490px'}
                src={src}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
        ))}

        <div className={clsx(styles[`swiperButtonNext${type}`], { [styles.hiddenButton]: isEnd })}>
          <ArrowIosForward
            className={styles[`swiperNextIcon${type}`]}
            fill={'white'}
            height={type === 'Black' ? 24 : 48}
            width={type === 'Black' ? 24 : 48}
          />
        </div>

        <div
          className={clsx(styles[`swiperButtonPrev${type}`], {
            [styles.hiddenButton]: isBeginning,
          })}
        >
          {type === 'Black' && (
            <ArrowIosBack
              className={styles[`swiperPrevIcon${type}`]}
              fill={'white'}
              height={24}
              width={24}
            />
          )}
          {type === 'Gray' && (
            <ArrowIosBackOutline
              className={styles[`swiperPrevIcon${type}`]}
              fill={'white'}
              height={48}
              width={48}
            />
          )}
        </div>

        <div className={styles[`swiperPagination${type}`]} />
      </Swiper>
    </div>
  )
}
