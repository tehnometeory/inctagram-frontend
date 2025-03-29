import { z } from 'zod'
import { calculateAge } from '../utils/calculateAge'

export const profileSchema = z.object({
  aboutMe: z.string().max(200, 'Maximum 200 characters').optional(),

  city: z.string().min(1, 'City is required'),

  country: z.string().min(1, 'Country is required'),

  dateOfBirth: z
    .date()
    .optional()
    .refine(date => !date || calculateAge(date), {
      message: 'A user under 13 cannot create a profile.',
    }),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'Maximum 50 characters')
    .regex(/^[A-Za-zА-Яа-я]+$/, 'Only letters are allowed'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Maximum 50 characters')
    .regex(/^[A-Za-zА-Яа-я]+$/, 'Only letters are allowed'),

  username: z
    .string()
    .min(6, 'Minimum 6 characters')
    .max(30, 'Maximum 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, _, and - are allowed'),
})
