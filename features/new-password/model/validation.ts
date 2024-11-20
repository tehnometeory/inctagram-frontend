import { PASSWORD_REQUIREMENTS } from '@/shared'
import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6)
      .max(20)
      .refine(
        password =>
          /[0-9]/.test(password) &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
        { message: PASSWORD_REQUIREMENTS }
      ),
    passwordConfirmation: z.string().min(6).max(20),
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
