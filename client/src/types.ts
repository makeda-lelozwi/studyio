type UserData = {
  authToken: string;
  userName: string;
  user_id: number;
  isLoggedIn: boolean;
};

type CourseData = {
  id: number;
  createdAT: string;
  documentId: string;
  price: number;
  title: string;
  cover: number;
  description: string;
  updatedAt: string;
  publishedAt: string;
  user_id: number;
};

type ImageEntry = {
  id: number;
  documentId: string;
  name: string;
  caption: string;
  alternativeText: string;
  url: string;
};

type UserDataResponse = {
  data: UserData;
  meta: Meta;
};

type CourseResponse = {
  data?: CourseData[];
  meta?: Meta;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type ErrorResponse = {
  error?: {
    message: string;
  };
};

export type {
  UserData,
  CourseData,
  ImageEntry,
  UserDataResponse,
  CourseResponse,
  ErrorResponse,
  Meta,
};
