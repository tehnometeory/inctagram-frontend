import React from 'react'

import styles from './EmailConfirmationWrapper.module.scss'

import { MessageBlock } from './MessageBlock'
import { ResponsiveImage } from './ResponsiveImage'

type EmailConfirmationWrapperProps = {
  children: React.ReactNode
  description: string
  imgSettings: ImgSettings
  title: string
}
type imgSizes = { height: number; width: number }
export type ImgSettings = {
  desktop: imgSizes
  mobile: imgSizes
  src: string
  tablet: imgSizes
}

export const EmailConfirmationWrapper = ({
  children,
  description,
  imgSettings,
  title,
}: EmailConfirmationWrapperProps) => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <MessageBlock description={description} title={title} />
        {children}
        <div className={styles.imageContainer}>
          <ResponsiveImage
            alt={'Email confirmed illustration'}
            sizes={{
              desktop: { height: imgSettings.desktop.height, width: imgSettings.desktop.width },
              mobile: { height: imgSettings.mobile.height, width: imgSettings.mobile.width },
              tablet: { height: imgSettings.tablet.height, width: imgSettings.tablet.width },
            }}
            src={imgSettings.src}
          />
        </div>
      </main>
    </div>
  )
}
