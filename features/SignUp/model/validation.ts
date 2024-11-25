import {
  EMAIL_FORMAT_ERROR_MESSAGE,
  MAX_CHARACTERS_MESSAGE,
  MIN_CHARACTERS_MESSAGE,
  PASSWORD_REQUIREMENTS,
  PASSWORDS_MUST_MATCH_MESSAGE,
  REG_EXP_PASSWORD,
  REG_EXP_USERNAME,
} from '@/shared'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreement: z.boolean().refine(val => val, 'This field is required'),
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
    passwordConfirmation: z.string(),
    username: z
      .string()
      .min(6, MIN_CHARACTERS_MESSAGE)
      .max(30, MAX_CHARACTERS_MESSAGE)
      .regex(REG_EXP_USERNAME, "Invalid characters. Only letters, numbers, '_' and '-'"),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: PASSWORDS_MUST_MATCH_MESSAGE,
    path: ['passwordConfirmation'],
  })
