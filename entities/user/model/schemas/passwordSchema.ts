import { PASSWORD_REQUIREMENTS, REG_EXP_PASSWORD } from '@/shared'
import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(6)
  .max(20)
  .refine(
    password =>
      /[0-9]/.test(password) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      REG_EXP_PASSWORD.test(password),
    { message: PASSWORD_REQUIREMENTS }
  )
