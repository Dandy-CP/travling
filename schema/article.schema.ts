import { z, ZodType } from 'zod';
import { ArticleBody } from '@/types/article.types';

export const ArticleSchema: ZodType<ArticleBody> = z.object({
  title: z.string().min(5, { message: 'Title min 5 Character' }),
  description: z.string().min(5, { message: 'Description min 5 Character' }),
  category: z.string().min(1, { message: 'Select Category' }),
  cover_image_url: z
    .union([
      z
        .instanceof(File, { message: 'Image is required' })
        .refine((file) => !file || file.size !== 0 || file.size <= 5000000, {
          message: 'Max size exceeded',
        }),
      z.string().optional(),
    ])
    .refine((value) => value instanceof File || typeof value === 'string', {
      message: 'Image is required',
    }),
});
