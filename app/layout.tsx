import { ReactNode } from 'react'

import { BaseLayout } from '@/shared'
import { AppHeader } from '@/widgets'

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
          <BaseLayout>
            <AppHeader />
            <main className={s.container}>{children}</main>
          </BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
