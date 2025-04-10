'use client'
import { useAddImage } from '@/features/createPost/hooks'
import { useAppDispatch } from '@/shared'
import { Button, Card, ImageIconOutline } from '@rambo-react/ui-meteors'
import clsx from 'clsx'

import s from './AddImage.module.scss'

import { loadDraft } from '../../../model'

export const AddImage = () => {
  const dispatch = useAppDispatch()

  const { getInputProps, getRootProps, isDragActive, open } = useAddImage()

  return (
    <div className={s.content}>
      <Card
        {...getRootProps({
          className: clsx(isDragActive && s.dragActive, s.card),
        })}
      >
        <input {...getInputProps()} />
        <ImageIconOutline fill={'var(--color-light-100)'} height={48} width={48} />
      </Card>
      <Button className={s.selectButton} fullWidth onClick={open}>
        Select from Computer
      </Button>
      <Button fullWidth onClick={() => dispatch(loadDraft())} variant={'outline'}>
        Open Draft
      </Button>
    </div>
  )
}
