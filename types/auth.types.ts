export interface AuthBody {
  identifier: string;
  password: string;
}

export interface SignUpBody {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: UserData;
}

export interface UserData {
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
