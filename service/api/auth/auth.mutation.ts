import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import { AuthResponse, AuthBody, SignUpBody } from '@/types/auth.types';

export function SignIn(
  options?: UseMutationOptions<AuthResponse, ApiError, AuthBody>
) {
  return useMutation<AuthResponse, ApiError, AuthBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'auth/local',
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}

export function SignUp(
  options?: UseMutationOptions<AuthResponse, ApiError, SignUpBody>
) {
  return useMutation<AuthResponse, ApiError, SignUpBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'auth/local/register',
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}
