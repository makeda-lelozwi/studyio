import { ReactNode } from "react";

type AlertComponentProp = {
  message: string;
  isError: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
};

type AuthResponse = {
  jwt: string;
  user: User;
};

type CourseData = {
  course: (string | Element) & ReactNode;
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

type CourseEntry = {
  price?: number;
  title?: string;
  cover?: number;
  description?: string;
  user_id?: number;
};

type CourseProps = {
  course: CourseData;
};

type CourseResponse = {
  data?: CourseData[];
  meta?: Meta;
};

type ErrorResponse = {
  error?: {
    message: string;
  };
};

type ImageEntry = {
  id: number;
  documentId: string;
  name: string;
  caption: string;
  alternativeText: string;
  url: string;
};

type ImageUploadData = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: null;
  width: number;
  height: number;
};

type ImageUploadResponse = ImageUploadData[];

type InitAction = {
  type: string;
  message: string;
  payload: CourseData[];
  isLoading: boolean;
};

type InitState = {
  data: CourseData[];
  isError: boolean;
  message: string;
  isLoading: boolean;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
};

type UserData = {
  authToken: string;
  userName: string;
  user_id: number;
  isLoggedIn: boolean;
};

type UserDataResponse = {
  data: UserData;
  meta: Meta;
};

export type {
  AlertComponentProp,
  AuthContextType,
  AuthResponse,
  CourseData,
  CourseEntry,
  CourseProps,
  CourseResponse,
  ErrorResponse,
  ImageEntry,
  ImageUploadResponse,
  InitAction,
  InitState,
  Meta,
  User,
  UserData,
  UserDataResponse,
};
