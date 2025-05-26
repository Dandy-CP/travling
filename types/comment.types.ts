export interface CommentBody {
  content: string;
  article?: number;
}

export interface CommentResponse {
  data: {
    id: number;
    documentId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: null | string;
  };
}
