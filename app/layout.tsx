import { ReactNode } from 'react'

import '@rambo-react/ui-meteors/dist/style.css'

import { Providers } from './Providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
