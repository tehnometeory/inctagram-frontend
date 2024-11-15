import { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { Input } from '@rambo-react/ui-meteors'

type InputProps = ComponentProps<typeof Input>

export type ControlledInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  ...restInputProps
}: ControlledInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} {...restInputProps} errorMsg={error && error.message} />
      )}
      rules={rules}
    />
  )
}
