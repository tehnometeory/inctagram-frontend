'use client'

import { ComponentProps } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { SelectBox } from '@rambo-react/ui-meteors'

type SelectBoxProps = Omit<ComponentProps<typeof SelectBox>, 'onValueChange' | 'value'>

export type ControlledSelectBoxProps<TFieldValues extends FieldValues> = SelectBoxProps &
  UseControllerProps<TFieldValues> & {
    label?: string
  }

export const ControlledSelectBox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  options,
  label, // Добавляем label
  ...restProps
}: ControlledSelectBoxProps<TFieldValues>) => {
  return (
    <div>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <SelectBox
            {...restProps}
            label={label}
            options={options}
            {...field}
            onValueChange={field.onChange}
          />
        )}
      />
    </div>
  )
}
