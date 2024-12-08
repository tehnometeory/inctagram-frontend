import { ComponentPropsWithoutRef } from 'react'

import { Card } from '@rambo-react/ui-meteors'
import clsx from 'clsx'

import s from './FormContainer.module.scss'

type Props = { title?: string } & ComponentPropsWithoutRef<'div'>

export const FormContainer = ({ children, className, title, ...props }: Props) => {
  return (
    <div className={clsx(s.formContainer, className)} {...props}>
      <Card className={s.card}>
        <h1 className={s.title}>{title}</h1>
        <div>{children}</div>
      </Card>
    </div>
  )
}
