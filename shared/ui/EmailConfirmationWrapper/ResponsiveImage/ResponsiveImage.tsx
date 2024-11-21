import Image from 'next/image'

import styles from './ResponsiveImage.module.scss'
interface ImageSize {
  height: number
  width: number
}

interface ResponsiveImageProps {
  alt: string
  sizes: {
    desktop: ImageSize
    mobile: ImageSize
    tablet: ImageSize
  }
  src: string
}

export const ResponsiveImage = ({ alt, sizes, src }: ResponsiveImageProps) => {
  return (
    <div
      className={styles.responsiveImage}
      style={
        {
          '--desktop-width': `${sizes.desktop.width}px`,
          '--mobile-width': `${sizes.mobile.width}px`,
          '--tablet-width': `${sizes.tablet.width}px`,
        } as React.CSSProperties
      }
    >
      <Image
        alt={alt}
        height={sizes.desktop.height}
        sizes={`(max-width: 768px) ${sizes.mobile.width}px,
                (max-width: 1024px) ${sizes.tablet.width}px,
                ${sizes.desktop.width}px`}
        src={src}
        style={{
          width: '100%',
        }}
        width={sizes.desktop.width}
      />
    </div>
  )
}
