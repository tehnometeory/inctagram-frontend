import type { Metadata } from 'next'

import { ReactNode } from 'react'

import '@rambo-react/ui-meteors/dist/style.css'

export const metadata: Metadata = {
  description: 'Sign In in your account',
  title: 'Sign In',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  )
}
