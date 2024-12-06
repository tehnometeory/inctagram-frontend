'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { AppAlert } from '@/features'
import { NextNprogress } from '@/shared'

import { store } from '../store'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {children}
      <AppAlert />
      <NextNprogress />
    </Provider>
  )
}
