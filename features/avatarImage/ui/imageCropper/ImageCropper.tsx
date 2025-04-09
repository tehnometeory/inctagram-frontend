import React from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactCrop } from 'react-image-crop'

import { setAlert } from '@/entities'
import { useAppDispatch } from '@/shared'
import { Button, Card, ImageIconOutline } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Image from 'next/image'

import 'react-image-crop/dist/ReactCrop.css'

import s from './ImageCropper.module.scss'

import { useUpdateAvatarMutation } from '../../api'
import { useFileUpload } from '../../hooks/useFileUpload'
import { useImageCrop } from '../../hooks/useImageCrop'

const MIN_DIMENSION = 192
const ASPECT_RATIO = 1

type Props = {
  onClose: () => void
  id: string
}

export const ImageCropper = ({ onClose, id }: Props) => {
  const formData = new FormData()
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation()
  const dispatch = useAppDispatch()
  const { error, handleFileDrop, imgSrc } = useFileUpload(MIN_DIMENSION)
  const { crop, handleCropComplete, imgRef, onImageLoad, previewCanvasRef, setCrop } = useImageCrop(
    MIN_DIMENSION,
    ASPECT_RATIO
  )

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: handleFileDrop,
  })

  const onSave = async () => {
    try {
      const result = await handleCropComplete()

      if (!result) {
        dispatch(
          setAlert({
            message: 'Error: Failed to process the image.',
            type: 'error',
          })
        )

        return
      }

      const { blob } = result

      formData.append('files', blob)
      await updateAvatar(formData).unwrap()
      await fetch('/api/revalidate?tag=profile-' + id, { method: 'POST' })
      onClose()
    } catch (error) {
      dispatch(
        setAlert({
          message: `Error update avatar photo: ${error}`,
          type: 'error',
        })
      )
    }
  }

  return (
    <div className={s.content}>
      {error && <div className={s.errorMessage}>{error}</div>}
      {imgSrc ? (
        <div className={s.cropContainer}>
          <canvas aria-hidden={'true'} ref={previewCanvasRef} style={{ display: 'none' }} />
          <div className={s.imageAndCrop}>
            <ReactCrop
              aspect={ASPECT_RATIO}
              circularCrop
              crop={crop}
              keepSelection
              minWidth={MIN_DIMENSION}
              onChange={(percentCrop, pixelCrop) => setCrop(percentCrop)}
            >
              <Image
                className={s.image}
                alt={imgSrc}
                height={340}
                onLoad={onImageLoad}
                ref={imgRef}
                src={imgSrc}
                width={332}
              />
            </ReactCrop>
          </div>
          <div className={s.buttonContainer}>
            <Button className={s.cropButton} disabled={isLoading} onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className={s.imageContainer}>
          <Card {...getRootProps({ className: clsx(isDragActive && s.dragActive, s.card) })}>
            <input {...getInputProps()} />
            <ImageIconOutline fill={'var(--color-light-100)'} height={36} width={36} />
          </Card>
          <Button className={s.selectButton} fullWidth onClick={open}>
            Select from Computer
          </Button>
        </div>
      )}
    </div>
  )
}
