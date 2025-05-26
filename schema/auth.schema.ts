import { z, ZodType } from 'zod';
import { AuthBody, SignUpBody } from '@/types/auth.types';

export const AuthSchema: ZodType<AuthBody> = z.object({
  identifier: z.string().email({ message: 'Email not valid' }),
  password: z.string().min(8, { message: 'Password min 8 Character' }),
});

export const RegisterSchema: ZodType<SignUpBody> = z.object({
  email: z.string().email({ message: 'Email not valid' }),
  username: z.string().min(5, { message: 'Username min 5 Character' }),
  password: z.string().min(8, { message: 'Password min 8 Character' }),
});
