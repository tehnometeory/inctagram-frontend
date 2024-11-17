import { useForm } from 'react-hook-form'

import { FormValues } from '@/shared/types'
import { useRouter } from 'next/navigation'

export const useSignIn = () => {
  const methods = useForm<FormValues>({
    mode: 'onBlur',
  })
  const router = useRouter()

  const REGULAR_FOR_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const RULES_FOR_PASSWORD = {
    maxLength: {
      message: 'Maximum number of characters 30',
      value: 30,
    },
    minLength: {
      message:
        'Minimum number of characters 6 adwadawdaadwadawdaadwadawdaadwadawdaadwadawdaadwadawdaadwadawda',
      value: 6,
    },
    required: 'Password is required',
  }

  const routeToSignUpHandler = () => {
    router.push('sign-up')
  }

  const onSubmit = (data: FormValues) => {
    try {
      const res = fetch('https://auth.tehnom.org/api/v1/auth/login', {
        body: JSON.stringify(data),

        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
      })
    } catch (e) {
      alert(e)
    }
  }

  const googleAuth = () => {
    fetch('https://auth.tehnom.org/api/v1/oauth/google/login', {
      method: 'GET',
    })
  }

  const githubAuth = () => {}

  return {
    REGULAR_FOR_EMAIL,
    RULES_FOR_PASSWORD,
    githubAuth,
    googleAuth,
    methods,
    onSubmit,
    routeToSignUpHandler,
  }
}
