import { MetaType } from './request.types';
import { CategoryType } from './category.types';

export interface ArticleResponse {
  data: ArticleType[];
  meta: MetaType;
}

export interface ArticleDetailResponse {
  data: ArticleType;
  meta: MetaType;
}

export interface ArticleType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
  user: UserType;
  comments: CommentType[];
  category: CategoryType;
}

export interface UserType {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
}

export interface CommentType {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
  user: UserType;
}

export interface ArticleBody {
  title: string;
  description: string;
  cover_image_url?: File | string;
  category?: number | string;
}

export interface EditArticleBody {
  documentID: string;
  title: string;
  description: string;
  cover_image_url?: string;
  category?: number;
}

export interface ArticleDeleteBody {
  documentID: string;
}

export interface ArticleMutationResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
}
