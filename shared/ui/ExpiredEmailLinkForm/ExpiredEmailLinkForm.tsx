'use client'
import React from 'react'
import { Control } from 'react-hook-form'

import { ControlledInput, SentEmailModal } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import styles from './ExpiredEmailLinkForm.module.scss'

type Props = {
  control?: Control<{ email: string }, any>
  email?: string
  handleCloseShowModal?: () => void
  isDisabled: boolean
  onSubmitHandler(): void
  showInput: boolean
  showModal?: boolean
}

export const ExpiredEmailLinkForm = ({
  control,
  email,
  handleCloseShowModal,
  isDisabled,
  onSubmitHandler,
  showInput,
  showModal,
}: Props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmitHandler()
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Email verification link expired</h1>
        <p className={styles.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>

        {showInput && (
          <div className={styles.input}>
            <ControlledInput
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
              type={'email'}
            />
          </div>
        )}

        <Button
          className={styles.btnResendLink}
          disabled={isDisabled}
          fullWidth={false}
          type={'submit'}
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
      {email && showModal && handleCloseShowModal && (
        <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
      )}
    </>
  )
}
