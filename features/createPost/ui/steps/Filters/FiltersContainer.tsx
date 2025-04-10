import { useState } from 'react'

import { useAppSelector } from '@/shared'
import { Carousel } from '@/shared/ui/Carousel'

import styles from './FiltersContainer.module.scss'

import { Filters } from './Filters'

export const FiltersContainer = () => {
  {
    const images = useAppSelector(state => state.createPost.currentPost.images)
    const croppedImages = images.map(image => image.croppedImage)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    return (
      <div className={styles.container}>
        <Carousel
          activeSlide={activeImageIndex}
          images={croppedImages}
          passActiveSlide={setActiveImageIndex}
        />
        <Filters
          activeImage={croppedImages[activeImageIndex]}
          activeImageIndex={activeImageIndex}
        />
      </div>
    )
  }
}
