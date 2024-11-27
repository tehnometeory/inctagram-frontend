import { useRef } from 'react'
import { Control } from 'react-hook-form'

import ExpiredEmailImg from '@/public/images/expiredEmail.svg'
import { ControlledInput, SentEmailModal } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import styles from './ExpiredEmailLinkForm.module.scss'

type ExpiredEmailLinkFormProps = {
  control: Control<{ email: string }, any>
  email: string
  handleCloseShowModal(): void
  handleSubmitDataForm(): void
  isDisabled: boolean
  showModal: boolean
}
export const ExpiredEmailLinkForm = ({
  control,
  email,
  handleCloseShowModal,
  handleSubmitDataForm,
  isDisabled,
  showModal,
}: ExpiredEmailLinkFormProps) => {
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
        disabled={isDisabled}
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
