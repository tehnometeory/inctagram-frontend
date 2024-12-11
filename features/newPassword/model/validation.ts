import { passwordSchema } from '@/entities'
import { PASSWORDS_MUST_MATCH_MESSAGE } from '@/shared'
import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    passwordConfirmation: z.string(),
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: PASSWORDS_MUST_MATCH_MESSAGE,
    path: ['passwordConfirmation'],
  })
