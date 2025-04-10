import { ChangeEvent, useCallback } from 'react'

import {
  setAspectControl,
  setThumbnailsControl,
  setZoom,
  setZoomControl,
} from '@/features/createPost/model'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Maximize, MaximizeOutline } from '@rambo-react/ui-meteors'

import s from './ZoomControl.module.scss'

import { IconButton } from './IconButton'

type Props = {
  imageId: string
  zoom: number
}

export const ZoomControl = ({ imageId, zoom }: Props) => {
  const isZoomControlOpen = useAppSelector(state => state.createPost.isZoomControlOpen)
  const dispatch = useAppDispatch()

  const zoomButtonHandler = useCallback(() => {
    dispatch(setZoomControl(!isZoomControlOpen))
    dispatch(setAspectControl(false))
    dispatch(setThumbnailsControl(false))
  }, [dispatch, isZoomControlOpen])

  const onZoomChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(e.target.value)

    dispatch(setZoom({ id: imageId, zoom }))
  }

  return (
    <div className={s.zoomContainer}>
      {isZoomControlOpen && (
        <div className={s.rangeContainer}>
          <input
            className={s.range}
            max={3}
            min={1}
            onInput={onZoomChangeHandler}
            step={0.1}
            style={{
              background: `linear-gradient(to right, var(--color-accent-500) ${
                ((zoom - 1) / (3 - 1)) * 100
              }%, var(--color-light-100) ${((zoom - 1) / (3 - 1)) * 100}%)`,
            }}
            type={'range'}
            value={zoom}
          />
        </div>
      )}

      <IconButton className={s.zoomButton} onClick={zoomButtonHandler}>
        {isZoomControlOpen ? (
          <Maximize fill={'var(--color-accent-500'} height={24} width={24} />
        ) : (
          <MaximizeOutline fill={'var(--color-light-100'} height={24} width={24} />
        )}
      </IconButton>
    </div>
  )
}
