import { MetaType } from './request.types';

export interface CategoryResponse {
  data: CategoryType[];
  meta: MetaType;
}

export interface CategoryType {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null | string;
}
