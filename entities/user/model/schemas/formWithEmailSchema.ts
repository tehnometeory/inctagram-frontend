import { z } from 'zod'

import { emailSchema } from './emailSchema'

export const formWithEmailSchema = z.object({
  email: emailSchema,
})
