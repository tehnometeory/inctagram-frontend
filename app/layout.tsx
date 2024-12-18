import { ReactNode } from 'react'

import '@rambo-react/ui-meteors/dist/style.css'

import s from './layout.module.scss'

import { Providers } from './Providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <Providers>
          <div className={s.content}>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
