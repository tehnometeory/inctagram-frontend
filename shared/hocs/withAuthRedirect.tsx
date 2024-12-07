'use client'

import React, { ComponentType, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '../hooks'

type Props = {
  children: ReactNode
}

export function withAuthRedirect<T extends Props>(Component: ComponentType<T>) {
  const AuthWrapper = (props: T) => {
    const isAuthorized = useAppSelector(state => state.auth.isAuthorized)
    const router = useRouter()

    useEffect(() => {
      if (isAuthorized) {
        router.push('/home')
      }
    }, [isAuthorized, router])

    if (!isAuthorized) {
      return <Component {...props} />
    }
  }

  return AuthWrapper
}
