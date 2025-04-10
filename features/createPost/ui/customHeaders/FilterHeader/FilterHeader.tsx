import { nextStep, prevStep, updateFilteredImage } from '@/features/createPost/model'
import { applyFilterToImage } from '@/features/createPost/utils/applyFilterToImage'
import { useAppDispatch, useAppSelector } from '@/shared'
import { ArrowIosBack, Button } from '@rambo-react/ui-meteors'

import s from '../customHeaders.module.scss'

export const FilterHeader = () => {
  const dispatch = useAppDispatch()
  const images = useAppSelector(state => state.createPost.currentPost.images)
  const croppedImages = images.map(image => image.croppedImage)

  const filters = images.map(image => image.activeFilter)
  const goBackHandler = () => {
    dispatch(prevStep())
  }
  const goNextHandler = async () => {
    for (let i = 0; i < croppedImages.length; i++) {
      const filteredImage = await applyFilterToImage(croppedImages[i], filters[i])

      dispatch(updateFilteredImage({ filteredImage: filteredImage, id: images[i].id }))
    }
    dispatch(nextStep())
  }

  return (
    <div className={s.headerContainer}>
      <button className={s.leftButton} onClick={goBackHandler} type={'button'}>
        <ArrowIosBack height={24} width={24} />
      </button>
      <p className={s.title}>Filters</p>
      <Button className={s.rightButton} onClick={goNextHandler} variant={'text'}>
        Next
      </Button>
    </div>
  )
}
