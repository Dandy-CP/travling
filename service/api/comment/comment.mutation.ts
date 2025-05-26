import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import { CommentResponse, CommentBody } from '@/types/comment.types';

export function PostComment(
  options?: UseMutationOptions<CommentResponse, ApiError, CommentBody>
) {
  return useMutation<CommentResponse, ApiError, CommentBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'comments',
        method: 'POST',
        body: {
          data: {
            ...body,
          },
        },
      });
    },
    ...options,
  });
}
