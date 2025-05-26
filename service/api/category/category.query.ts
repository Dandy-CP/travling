import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import { CategoryResponse } from '@/types/category.types';
import { ApiError } from '@/types/request.types';

export function GetCategory(
  inputParams?: { [key: string]: any },
  options?: UseQueryOptions<CategoryResponse, ApiError>
) {
  return useQuery<CategoryResponse, ApiError>({
    queryKey: ['categories'],
    queryFn: async () => {
      return await fetchData({
        url: 'categories',
        inputParams: {
          ...inputParams,
        },
      });
    },
    ...options,
  });
}
