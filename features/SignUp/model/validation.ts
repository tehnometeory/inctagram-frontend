import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreement: z.boolean().refine(val => val, 'This field is required'),
    email: z.string().email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>?/`~\\-]).+$/,
        `Password must contain a-z, A-Z, 0-9, and a special character`
      ),
    passwordConfirmation: z.string(),
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid characters. Only letters, numbers, '_' and '-'"),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })
