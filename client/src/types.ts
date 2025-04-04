type UserData = {
  authToken: string;
  userName: string;
  user_id: number;
  isLoggedIn: boolean;
};

type CourseData = {
  id: number;
  createdAt: string;
  documentId: string;
  price: number;
  title: string;
  cover: ImageEntry;
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

type AlertComponentProp = {
  message: string;
  isError: boolean;
};

type CourseProps = {
  course: CourseData;
};

type InitState = {
  data: CourseData[];
  isError: boolean;
  message: string;
  isLoading: boolean;
};
type InitAction = {
  type: string;
  message: string;
  payload: CourseData[];
  isLoading: boolean;
};

type AuthResponse = {
  jwt: string;
  user: User;
};

type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
};
export type {
  AlertComponentProp,
  AuthContextType,
  User,
  UserData,
  CourseData,
  CourseProps,
  ImageEntry,
  InitAction,
  InitState,
  AuthResponse,
  UserDataResponse,
  CourseResponse,
  ErrorResponse,
  Meta,
};
