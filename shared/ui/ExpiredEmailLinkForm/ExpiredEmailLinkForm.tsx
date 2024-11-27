import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formWithEmailSchema } from '@/entities'
import { ControlledInput, SentEmailModal } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import styles from './ExpiredEmailLinkForm.module.scss'

type Props = {
  isDisabled: boolean
  onSubmit(data: FormValues): Promise<boolean>
}
type FormValues = {
  email: string
}

export const ExpiredEmailLinkForm = ({ isDisabled, onSubmit }: Props) => {
  const [showModal, setShowModal] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(formWithEmailSchema),
  })

  const email = watch('email')

  const handleCloseShowModal = () => {
    setShowModal(false)
  }

  const onSubmitHandler = handleSubmit(async data => {
    const isResponseSuccessful = await onSubmit(data)

    if (isResponseSuccessful) {
      setShowModal(true)
      reset()
    }
  })

  return (
    <>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1 className={styles.title}>Email verification link expired</h1>
        <p className={styles.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <ControlledInput
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <Button
          className={styles.btnResendLink}
          disabled={isDisabled}
          fullWidth={false}
          variant={'primary'}
        >
          Resend verification link
        </Button>
        <Image
          alt={'confirmed email'}
          className={styles.img}
          height={300}
          sizes={`(max-width: 425px) 320px,
                432px`}
          src={'/images/expiredEmail.svg'}
          width={432}
        />
      </form>

      <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
    </>
  )
}