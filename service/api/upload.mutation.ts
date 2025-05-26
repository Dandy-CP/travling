import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationFormData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import { UploadBody, UploadMutationResponse } from '@/types/upload.types';

export function UploadImage(
  options?: UseMutationOptions<UploadMutationResponse[], ApiError, UploadBody>
) {
  return useMutation<UploadMutationResponse[], ApiError, UploadBody>({
    mutationFn: async (body) => {
      return await mutationFormData({
        url: 'upload',
        method: 'POST',
        body: {
          files: body.files,
        },
      });
    },
    ...options,
  });
}
