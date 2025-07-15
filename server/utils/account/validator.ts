import { z } from 'zod'

export const registerSchema = z.object({
  email   : z.string().trim().pipe(z.email()),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name    : z.string().min(2, 'Name must be at least 2 characters'),
})

export function validateRegister(data: any) {
  const result = registerSchema.safeParse(data)
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Validation failed'
    return {
      error: new Error(firstError),
      value: null,
    }
  }
  return {
    error: null,
    value: result.data,
  }
}
