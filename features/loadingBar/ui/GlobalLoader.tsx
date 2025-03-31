'use client'

import { useEffect } from 'react'

import { useAppSelector } from '@/shared'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})
export const GlobalLoader = () => {
  const requests = useAppSelector(state => state.loading.request)

  useEffect(() => {
    if (requests > 0) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [requests])

  return null
}
