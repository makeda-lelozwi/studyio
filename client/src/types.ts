type UserData = {
  authToken: string;
  userName: string;
  isLoggedIn: boolean;
};

type CourseData = {
  id:number;
  createdAT: string;
  documentId:string;
  price:number;
  title: string;
  description: string;
  updatedAt: string;
  publishedAt: string;
  user_id:number;
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
  UserDataResponse,
  CourseResponse,
  ErrorResponse,
  Meta,
};
