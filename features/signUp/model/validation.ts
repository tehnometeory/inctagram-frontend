import { passwordSchema } from '@/entities'
import {
  EMAIL_FORMAT_ERROR_MESSAGE,
  MAX_CHARACTERS_MESSAGE,
  MIN_CHARACTERS_MESSAGE,
  PASSWORDS_MUST_MATCH_MESSAGE,
  REG_EXP_USERNAME,
} from '@/shared'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreement: z.boolean().refine(val => val, 'This field is required'),
    email: z.string().email(EMAIL_FORMAT_ERROR_MESSAGE),
    password: passwordSchema,
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
