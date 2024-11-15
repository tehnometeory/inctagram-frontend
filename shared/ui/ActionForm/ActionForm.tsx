'use client'

import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared/ui'
import { Button } from '@rambo-react/ui-meteors'

import styles from '@/app/auth/confirmed-email/ConfirmedEmail.module.scss'

interface ActionFormProps {
  buttonText: string
  inputPlaceholder: string
  onButtonClickAction: (data: { email: string }) => void
}

export const ActionForm = ({
  buttonText,
  inputPlaceholder,
  onButtonClickAction,
}: ActionFormProps) => {
  const { control, handleSubmit } = useForm<{ email: string }>()

  const onSubmit = (data: { email: string }) => {
    onButtonClickAction(data) // Передаём данные формы в проп `onButtonClick`
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        defaultValue={'epam@epam.com'}
        name={'email'}
        placeholder={inputPlaceholder}
        rules={{
          pattern: {
            message: 'Invalid email format',
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
          required: 'Email is required',
        }}
        type={'email'}
      />
      <Button fullWidth type={'submit'} variant={'primary'}>
        {buttonText}
      </Button>
    </form>
  )
}
