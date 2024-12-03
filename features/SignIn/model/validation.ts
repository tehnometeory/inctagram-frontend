import { emailSchema, passwordSchema } from '@/entities'
import { z } from 'zod'

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
