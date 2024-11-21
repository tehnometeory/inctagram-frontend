import { useEffect, useState } from 'react'

export const useScreenDetector = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 576
  const isTablet = width > 576 && width <= 1024
  const isDesktop = width > 1024

  return { isDesktop, isMobile, isTablet }
}
