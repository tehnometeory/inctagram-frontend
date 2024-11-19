'use client'

import { useState } from 'react'

import { SignUp } from '@/features'
import { SentEmailModal } from '@/shared'

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const onCloseHandler = () => {
    setIsModalOpen(false)
  }

  const onSuccessfulSubmit = (email: string) => {
    setEmail(email)
    setIsModalOpen(true)
  }

  return (
    <>
      <SentEmailModal email={email} isOpen={isModalOpen} onCloseHandler={onCloseHandler} />
      <SignUp onSuccessfulSubmit={onSuccessfulSubmit} />
    </>
  )
}
