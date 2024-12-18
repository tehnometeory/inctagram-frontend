'use client'

import { useEffect } from 'react'

import { useNRouter } from '@/shared'

export default function Home() {
  const router = useNRouter()

  useEffect(() => {
    router.push('home')
  }, [router])

  return null
}
