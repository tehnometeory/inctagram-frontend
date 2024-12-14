import React from 'react'

import { ArrowIosBack, ArrowIosBackOutline, ArrowIosForward } from '@rambo-react/ui-meteors'
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
  return (
    <Swiper
      loop={false} // Отключаем зацикливание
      modules={[Navigation, Pagination]} // Подключаем модули
      navigation={{
        nextEl: `.${styles[`swiperButtonNext${type}`]}`,
        prevEl: `.${styles[`swiperButtonPrev${type}`]}`,
      }} // Включаем стрелки
      pagination={{
        clickable: true,
        el: styles[`swiperPagination${type}`],
      }} // Кликабельные точки
      slidesPerView={1}
      spaceBetween={50}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div style={{ height: '300px', width: '100%' }}>
            <Image
              alt={`Image ${index + 1}`}
              layout={'fill'}
              loading={index === 0 ? 'eager' : 'lazy'}
              priority={index === 0}
              src={src}
            />
          </div>
        </SwiperSlide>
      ))}
      <div className={styles[`swiperButtonNext${type}`]}>
        <ArrowIosForward className={styles[`swiperNextIcon${type}`]} fill={'white'} />
      </div>
      <div className={styles[`swiperButtonPrev${type}`]}>
        {type === 'Black' && (
          <ArrowIosBack className={styles[`swiperPrevIcon${type}`]} fill={'white'} />
        )}
        {type === 'Gray' && <ArrowIosBackOutline className={styles[`swiperPrevIcon${type}`]} />}
      </div>
      <div className={styles[`swiperPagination${type}`]} />
    </Swiper>
  )
}
