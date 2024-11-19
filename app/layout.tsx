'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import '@rambo-react/ui-meteors/dist/style.css'

import { store } from './store'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
