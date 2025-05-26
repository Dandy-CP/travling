import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationData } from '@/config/request';
import { ApiError } from '@/types/request.types';
import {
  ArticleBody,
  ArticleDeleteBody,
  EditArticleBody,
  ArticleMutationResponse,
} from '@/types/article.types';

export function CreateArticle(
  options?: UseMutationOptions<ArticleMutationResponse, ApiError, ArticleBody>
) {
  return useMutation<ArticleMutationResponse, ApiError, ArticleBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'articles',
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

export function EditArticle(
  options?: UseMutationOptions<
    ArticleMutationResponse,
    ApiError,
    EditArticleBody
  >
) {
  return useMutation<ArticleMutationResponse, ApiError, EditArticleBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: `articles/${body.documentID}`,
        method: 'PUT',
        body: {
          data: {
            title: body.title,
            description: body.description,
            cover_image_url: body.cover_image_url,
            category: body.category,
          },
        },
      });
    },
    ...options,
  });
}

export function DeleteArticle(
  options?: UseMutationOptions<
    ArticleMutationResponse,
    ApiError,
    ArticleDeleteBody
  >
) {
  return useMutation<ArticleMutationResponse, ApiError, ArticleDeleteBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: `articles/${body.documentID}`,
        method: 'DELETE',
      });
    },
    ...options,
  });
}
