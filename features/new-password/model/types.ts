import { z } from 'zod'

import { newPasswordSchema } from './validation'

export type NewPasswordFields = z.infer<typeof newPasswordSchema>

export type SetPasswordResponse = any

export type SetPasswordArg = {
  code: string
  password: string
}

type ValidationError = {
  field: string
  message: string
}

export type ErrorResponse = {
  errorsMessages?: ValidationError[]
}
