import { z } from 'zod'

import { emailSchema } from '..'

export const formWithEmailSchema = z.object({
  email: emailSchema,
})
