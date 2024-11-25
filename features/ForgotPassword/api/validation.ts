import { z } from 'zod'

export const passwordRecoverySchema = z.object({
  email: z.string().email('The email must match the format example@example.com'),
})
