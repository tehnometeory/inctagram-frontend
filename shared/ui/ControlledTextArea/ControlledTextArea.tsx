'use client'

import { TextArea } from '@rambo-react/ui-meteors'
import { ComponentPropsWithoutRef } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

type TextAreaProps = ComponentPropsWithoutRef<typeof TextArea>

export type ControlledTextAreaProps<TFieldValues extends FieldValues> = Omit<
  TextAreaProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledTextArea = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  ...restTextAreaProps
}: ControlledTextAreaProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextArea {...field} {...restTextAreaProps} errorText={error?.message} />
      )}
      rules={rules}
    />
  )
}
