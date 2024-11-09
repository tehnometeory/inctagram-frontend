import type { Metadata } from 'next'

import { ReactNode } from 'react'

export const metadata: Metadata = {
  description:
    "Create an account or log in to Inctagram - Share what you're into with the people who get you.",
  title: 'Inctagram',
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
