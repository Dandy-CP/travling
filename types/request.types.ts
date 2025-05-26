export type MutationMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions {
  url: string;
  inputParams?: { [key: string]: string | number };
}

export interface MutationDataOptions {
  url: string;
  method: MutationMethodType;
  body?: { [key: string]: any };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface MutationFormDataOptions {
  url: string;
  method: MutationMethodType;
  body: { [key: string]: any };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface ApiError {
  response: {
    data: {
      data: any;
      error: {
        status: number;
        name: string;
        message: string;
        details: any;
      };
    };
  };
}

export interface MetaType {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
