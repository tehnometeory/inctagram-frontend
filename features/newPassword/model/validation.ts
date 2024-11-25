import { passwordSchema } from '@/entities'
import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    passwordConfirmation: z.string(),
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
