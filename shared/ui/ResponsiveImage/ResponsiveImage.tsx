import { useScreenDetector } from '@/shared/hooks/useScreenDetector'
import Image from 'next/image'

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
  const { isDesktop, isTablet } = useScreenDetector()

  function getDeviceSize(
    isDesktop: boolean,
    isTablet: boolean,
    sizes: { desktop: ImageSize; mobile: ImageSize; tablet: ImageSize }
  ) {
    if (isDesktop) {
      return sizes.desktop
    }
    if (isTablet) {
      return sizes.tablet
    }

    return sizes.mobile
  }

  const { height, width } = getDeviceSize(isDesktop, isTablet, sizes)

  return <Image alt={alt} height={height} src={src} width={width} />
}
