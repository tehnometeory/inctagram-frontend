import { nextStep, resetCurrentPost } from '@/features/createPost/model'
import { useAppDispatch } from '@/shared'
import { ArrowIosBack, Button } from '@rambo-react/ui-meteors'

import s from '../customHeaders.module.scss'

export const CroppingHeader = () => {
  const dispatch = useAppDispatch()
  const goBackHandler = () => {
    dispatch(resetCurrentPost())
  }
  const goNextHandler = () => {
    dispatch(nextStep())
  }

  return (
    <div className={s.headerContainer}>
      <button className={s.leftButton} onClick={goBackHandler} type={'button'}>
        <ArrowIosBack height={24} width={24} />
      </button>
      <p className={s.title}>Cropping</p>
      <Button className={s.rightButton} onClick={goNextHandler} variant={'text'}>
        Next
      </Button>
    </div>
  )
}
