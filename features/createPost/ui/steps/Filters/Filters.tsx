import React from 'react'

import { setActiveFilter } from '@/features/createPost/model'
import { useAppDispatch, useAppSelector } from '@/shared'
import Image from 'next/image'

import styles from './Filters.module.scss'

const imageFilters = {
  Normal: 'none',
  // eslint-disable-next-line perfectionist/sort-objects
  Clarendon: 'brightness(1.2) contrast(1.3) saturate(1.5)',
  Crema: 'brightness(1.1) saturate(1.3) contrast(1.2)',
  Gingham: 'brightness(1.1) hue-rotate(20deg) contrast(1.1)',
  Juno: 'brightness(1.3) contrast(1.5) saturate(1.6)',
  Lark: 'brightness(1.2) contrast(1.1) saturate(1.4)',
  Moon: 'grayscale(0.4) brightness(1.3) contrast(1.4)',
  Reyes: 'brightness(1.2) contrast(1.2) saturate(1.4)',
  Slumber: 'brightness(1.1) saturate(1.2) contrast(1.3)',
}

type FilterProps = {
  activeImage: string
  activeImageIndex: number
}

export const Filters = ({ activeImage, activeImageIndex }: FilterProps) => {
  const images = useAppSelector(state => state.createPost.currentPost.images)
  const id = images[activeImageIndex].id
  const dispatch = useAppDispatch()
  const onClickHandler = (filterValue: string) => {
    dispatch(setActiveFilter({ filter: filterValue, id }))
  }

  return (
    <div className={styles.container}>
      {Object.entries(imageFilters).map(([filterName, filterValue]) => (
        <div className={styles.filter} key={filterName} onClick={() => onClickHandler(filterValue)}>
          <Image
            alt={filterName}
            height={108}
            priority
            src={activeImage}
            style={{ filter: filterValue, objectFit: 'cover' }}
            width={108}
          />
          <span className={styles.filterName}>{filterName}</span>
        </div>
      ))}
    </div>
  )
}
