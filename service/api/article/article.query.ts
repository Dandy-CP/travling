import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import { ArticleResponse, ArticleDetailResponse } from '@/types/article.types';
import { ApiError } from '@/types/request.types';

export function GetArticles(
  inputParams?: { [key: string]: any },
  options?: UseQueryOptions<ArticleResponse, ApiError>
) {
  return useQuery<ArticleResponse, ApiError>({
    queryKey: ['articles'],
    queryFn: async () => {
      return await fetchData({
        url: 'articles',
        inputParams: {
          ...inputParams,
        },
      });
    },
    ...options,
  });
}

export function GetArticlesDetail(
  inputParams?: { [key: string]: any },
  options?: UseQueryOptions<ArticleDetailResponse, ApiError>
) {
  return useQuery<ArticleDetailResponse, ApiError>({
    queryKey: ['articles-detail'],
    queryFn: async () => {
      return await fetchData({
        url: `articles/${inputParams?.id}`,
        inputParams: {
          ...inputParams,
        },
      });
    },
    ...options,
  });
}
