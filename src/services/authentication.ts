import { request } from "../config/axios";
import { AxiosPromise } from "axios";
import { UserLogin } from "../interfaces/userLogin";
import { User } from "../interfaces/user";
import { UserLoginResponse } from "../interfaces/userLoginResponse";



export const loginApi = (
  data: UserLogin
): AxiosPromise<HttpResponse<UserLoginResponse>> => {
  return request({
    url: `/auth/signin`,
    method: "POST",
    data: data,
  });
};
