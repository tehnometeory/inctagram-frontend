import { ComponentPropsWithoutRef } from 'react'

import { Card } from '@rambo-react/ui-meteors'
import clsx from 'clsx'

import s from './FormContainer.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const FormContainer = ({ children, className }: Props) => {
  return (
    <div className={clsx(s.formContainer, className)}>
      <Card className={s.card}>{children}</Card>
    </div>
  )
}
