import { AxiosPromise } from "axios";
import { request } from "../config/axios";
import { Room, UpdateRoomApi } from "../interfaces/room";

export const fetchRoomsListApi = (): AxiosPromise<HttpResponse<Room[]>> => {
  return request({
    url: `/phong-thue`,
    method: "GET",
  });
};

export const fetchRoomDetailsApi = (
  id: number
): AxiosPromise<HttpResponse<Room>> => {
  return request({
    url: `/phong-thue/${id}`,
    method: "GET",
  });
};

export const createRoomApi = (data: Room): AxiosPromise<HttpResponse<Room>> => {
  return request({
    url: `/phong-thue`,
    method: "POST",
    data,
  });
};

export const updateRoomApi = (
  data: UpdateRoomApi
): AxiosPromise<HttpResponse<Room>> => {
  return request({
    url: `/phong-thue/${data.id}`,
    method: "PUT",
    data: data.submitData,
  });
};

export const deleteRoomApi = (id: number) => {
  return request({
    url: `/phong-thue/${id}`,
    method: "DELETE",
  });
};
