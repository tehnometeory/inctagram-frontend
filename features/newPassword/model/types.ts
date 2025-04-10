import { z } from 'zod'

import { newPasswordSchema } from './validation'

export type NewPasswordFields = z.infer<typeof newPasswordSchema>
