import { z } from 'zod'

export const emailSchema = z.string().email('The email must match the format example@example.com')
