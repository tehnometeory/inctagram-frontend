'use client'

import { useEffect } from 'react'

import { RoutesApp, useNRouter } from '@/shared'

export default function Home() {
  const router = useNRouter()

  useEffect(() => {
    router.push(RoutesApp.home)
  }, [router])

  return null
}
