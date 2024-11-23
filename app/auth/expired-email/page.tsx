'use client'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledInput, SentEmailModal } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './ExpiredEmail.module.scss'

import ExpiredEmailImg from '../../../public/images/expiredEmail.svg'
import { useResendEmailMutation } from './api/api'

export default function ExpiredEmail() {
  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
  })
  const [showModal, setShowModal] = useState(false)
  const [resendEmail, { isLoading: isLoadingResendEmail }] = useResendEmailMutation()
  const router = useRouter()
  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }
  const handleSubmitDataForm = handleSubmit(async data => {
    debugger
    try {
      await resendEmail({ email: data.email }).unwrap()
      setValue('email', data.email)
      setShowModal(true)
    } catch {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  })
  const email = watch('email')
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Email verification link expired</h1>
      <p className={styles.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
      <form onSubmit={handleSubmitDataForm} ref={formRef}>
        <ControlledInput
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
      </form>
      <Button
        className={styles.btnResendLink}
        fullWidth={false}
        onClick={() => handleSubmitDataForm()}
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
        src={ExpiredEmailImg}
        style={{
          width: '100%',
        }}
        width={432}
      />
      <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
    </div>
  )
}
