import { request } from "../config/axios";
import { AxiosPromise, AxiosResponse } from "axios";
import { Location, UpdateLocationApi } from "../interfaces/location";
import { LocationPOST } from "../interfaces/locationPOST";

export const createLocationApi = (data: Location) => {
  return request({
    url: `/vi-tri`,
    method: "POST",
    data,
  });
};

export const updateLocationApi = (
  data: UpdateLocationApi
): AxiosPromise<HttpResponse<Location>> => {
  return request({
    url: `/vi-tri/${data.id}`,
    method: "PUT",
    data: data.submitData,
  });
};

export const fetchLocationsListApi = (): AxiosPromise<
  HttpResponse<Location[]>
> => {
  return request({
    url: `/vi-tri`,
    method: "GET",
  });
};

export const fetchLocationDetailsApi = (
  id: number | undefined
): AxiosPromise<HttpResponse<Location>> => {
  return request({
    url: `/vi-tri/${id}`,
    method: "GET",
  });
};

export const deleteLocationApi = (id: number) => {
  return request({
    url: `/vi-tri/${id}`,
    method: "DELETE",
  });
};
