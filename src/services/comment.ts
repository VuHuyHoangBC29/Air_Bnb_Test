import { Axios, AxiosPromise } from "axios";
import { request } from "../config/axios";
import { Comment } from "../interfaces/comment";

export const fetchCommentsListApi = (): AxiosPromise<
  HttpResponse<Comment[]>
> => {
  return request({
    url: `/binh-luan`,
    method: "GET",
  });
};

export const createCommentApi = (
  data: Comment
): AxiosPromise<HttpResponse<Comment>> => {
  return request({
    url: `/binh-luan`,
    method: "POST",
    data,
  });
};

export const deleteCommentApi = (id: number) => {
  return request({
    url: `/binh-luan/${id}`,
    method: "DELETE",
  });
};
