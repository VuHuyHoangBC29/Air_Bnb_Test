import { UserType } from "../enums/user";
import {
  BASE_URL,
  TOKEN_CYBERSOFT,
  USER_INFO_KEY,
  USER_TOKEN,
} from "../constants/common";
import { Update } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: any;
  birthday: string;
  avatar?: any;
  gender: boolean;
  role: UserType;
}

export interface RegisterUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

export interface RegisterUserThunk {
  submitData: RegisterUser;
  callback: Function;
}

export interface CreateUser {
  submitData: User;
  callback: Function;
}

export interface UpdateUser {
  id: number;
  name: string;
  email: string;
  phone?: number;
  birthday: string;
  gender: boolean;
  role: UserType;
}

export interface UpdateUserApi {
  submitData: UpdateUser;
  id: number;
}

export interface UpdateUserThunk {
  submitData: UpdateUserApi;
  callback: Function;
  destination: string;
}

export interface UpdateUserAvatar {
  file: any;
}
