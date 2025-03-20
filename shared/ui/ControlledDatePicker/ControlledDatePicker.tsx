import { ComponentProps } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { DatePicker } from '@rambo-react/ui-meteors'

type DatePickerProps = Omit<ComponentProps<typeof DatePicker>, 'getDate'> & {
  getDate?: (dates: Date[]) => void
}

export type ControlledDatePickerProps<TFieldValues extends FieldValues> = DatePickerProps &
  UseControllerProps<TFieldValues>

export const ControlledDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  getDate = () => {}, // Передаем пустую функцию по умолчанию
  ...restProps
}: ControlledDatePickerProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...restProps}
          error={error?.message}
          getDate={(dates: Date[]) => {
            field.onChange(dates)
            getDate(dates)
          }}
        />
      )}
    />
  )
}
