import { request } from "../config/axios";
import { AxiosPromise, AxiosResponse } from "axios";
import {
  RegisterUser,
  UpdateUser,
  UpdateUserApi,
  UpdateUserAvatar,
  User,
} from "../interfaces/user";

export const fetchUsersListApi = (): AxiosPromise<HttpResponse<User[]>> => {
  return request({
    url: `/users/`,
    method: "GET",
  });
};

export const fetchUsersListByPageApi = (
  page: number
): AxiosPromise<HttpResponsePhanTrang<any, User[]>> => {
  return request({
    url: `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=10`,
    method: "GET",
  });
};

export const fetchUserDetailedInfoApi = (
  id: number
): AxiosPromise<HttpResponse<User>> => {
  return request({
    url: `/users/${id}`,
    method: "GET",
  });
};

export const registerUserApi = (
  data: RegisterUser
): AxiosPromise<HttpResponse<User>> => {
  return request({
    url: `/auth/signup`,
    method: "POST",
    data,
  });
};

export const createUserApi = (data: User): AxiosPromise<HttpResponse<User>> => {
  return request({
    url: `/users`,
    method: "POST",
    data,
  });
};

export const updateUserApi = (
  data: UpdateUserApi
): AxiosPromise<HttpResponse<User>> => {
  return request({
    url: `/users/${data.id}`,
    method: "PUT",
    data: data.submitData,
  });
};

export const deleteUserApi = (id: number) => {
  return request({
    url: `/users?id=${id}`,
    method: "DELETE",
  });
};

export const updateUserAvatarApi = (
  data: FormData
): AxiosPromise<HttpResponse<User>> => {
  return request({
    url: `/users/upload-avatar`,
    method: "POST",
    data,
  });
};
