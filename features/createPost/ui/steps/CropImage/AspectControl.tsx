import { useCallback, useMemo } from 'react'

import {
  setAspect,
  setAspectControl,
  setThumbnailsControl,
  setZoomControl,
} from '@/features/createPost/model'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Expand, ImageIconOutline } from '@rambo-react/ui-meteors'
import clsx from 'clsx'

import s from './AspectControl.module.scss'

import { IconButton } from './IconButton'

type Props = {
  aspect: number
  height: number
  imageId: string
  width: number
}

const IconOneToOne = () => <div className={s.oneToOne}></div>
const IconFourToFive = () => <div className={s.fourToFive}></div>
const IconSixteenToNine = () => <div className={s.sixteenToNine}></div>
const IconOriginal = () => (
  <div className={s.originalImage}>
    <ImageIconOutline fill={'currentColor'} height={24} width={24} />
  </div>
)

export const AspectControl = ({ aspect, height, imageId, width }: Props) => {
  const isAspectControlOpen = useAppSelector(state => state.createPost.isAspectControlOpen)
  const dispatch = useAppDispatch()

  const aspectButtonHandler = useCallback(() => {
    dispatch(setZoomControl(false))
    dispatch(setAspectControl(!isAspectControlOpen))
    dispatch(setThumbnailsControl(false))
  }, [dispatch, isAspectControlOpen])

  const aspectRatios = useMemo(
    () => [
      {
        icon: <IconOriginal />,
        text: 'Оригинал',
        value: width / height,
      },
      { icon: <IconOneToOne />, text: '1:1', value: 1 / 1 },
      { icon: <IconFourToFive />, text: '4:5', value: 4 / 5 },
      { icon: <IconSixteenToNine />, text: '16:9', value: 16 / 9 },
    ],
    [width, height]
  )

  const onAspectRatioSelect = (value: number) => {
    dispatch(setAspect({ aspect: value, id: imageId }))
  }

  return (
    <div className={s.aspectContainer}>
      {isAspectControlOpen && (
        <div className={s.aspectRatioList}>
          {aspectRatios.map(ratio => (
            <div
              className={clsx(s.aspectRatioItem, ratio.value === aspect && s.active)}
              key={ratio.text}
              onClick={() => onAspectRatioSelect(ratio.value)}
            >
              <span>{ratio.text}</span>
              <div>{ratio.icon}</div>
            </div>
          ))}
        </div>
      )}

      <IconButton className={s.aspectButton} onClick={aspectButtonHandler}>
        <Expand
          fill={isAspectControlOpen ? 'var(--color-accent-500' : 'var(--color-light-100'}
          height={24}
          width={24}
        />
      </IconButton>
    </div>
  )
}
