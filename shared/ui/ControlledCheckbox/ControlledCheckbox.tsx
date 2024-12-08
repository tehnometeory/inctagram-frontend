'use client'

import { ComponentProps } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox } from '@rambo-react/ui-meteors'

type CheckboxProps = ComponentProps<typeof CheckBox>

type Props<T extends FieldValues> = Omit<CheckboxProps, 'checked' | 'onCheckedChange'> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...CheckboxProps
}: Props<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <CheckBox {...CheckboxProps} checked={value} onCheckedChange={onChange} />
}
