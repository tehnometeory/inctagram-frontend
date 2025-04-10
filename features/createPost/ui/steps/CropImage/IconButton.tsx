import React, { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './IconButton.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const IconButton = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx(s.buttonWrapper, className)} {...props}>
      {children}
    </div>
  )
}
