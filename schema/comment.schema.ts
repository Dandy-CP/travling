import { z, ZodType } from 'zod';
import { CommentBody } from '@/types/comment.types';

export const CommentSchema: ZodType<CommentBody> = z.object({
  content: z.string().min(5, { message: 'Content min 5 Character' }),
});
