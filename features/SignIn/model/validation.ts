import {
  EMAIL_FORMAT_ERROR_MESSAGE,
  MAX_CHARACTERS_MESSAGE,
  MIN_CHARACTERS_MESSAGE,
  PASSWORD_REQUIREMENTS,
  REG_EXP_PASSWORD,
} from '@/shared'
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(EMAIL_FORMAT_ERROR_MESSAGE),
  password: z
    .string()
    .min(6, MIN_CHARACTERS_MESSAGE)
    .max(20, MAX_CHARACTERS_MESSAGE)
    .refine(
      password =>
        /[0-9]/.test(password) &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        REG_EXP_PASSWORD.test(password),
      PASSWORD_REQUIREMENTS
    ),
})
