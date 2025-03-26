'use client'

import { ReactNode, useState } from 'react'
import { Provider } from 'react-redux'

import { AppAlert, AuthInitializer } from '@/features'
import { Loader, NextNprogress } from '@/shared'

import { store } from '../store'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Provider store={store}>
      {isLoading ? <Loader /> : children}
      <AppAlert />
      <NextNprogress />
      <AuthInitializer onLoaded={() => setIsLoading(false)} />
    </Provider>
  )
}
