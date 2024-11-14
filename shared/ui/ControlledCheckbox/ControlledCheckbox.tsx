import { ComponentProps } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox } from '@rambo-react/ui-meteors'

type CheckboxProps = ComponentProps<typeof CheckBox>

type Props<T extends FieldValues> = { required?: boolean } & Omit<
  CheckboxProps,
  'checked' | 'onCheckedChange'
> &
  Omit<UseControllerProps<T>, 'rules'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  required,
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
    rules: {
      required: required,
    },
    shouldUnregister,
  })

  return <CheckBox {...CheckboxProps} checked={value} onCheckedChange={onChange} />
}
