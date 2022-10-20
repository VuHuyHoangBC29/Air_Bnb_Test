import { AxiosPromise } from "axios";
import { request } from "../config/axios";
import { Ticket } from "../interfaces/ticket";

export const fetchTicketListApi = (): AxiosPromise<HttpResponse<Ticket[]>> => {
  return request({
    url: `/dat-phong`,
    method: "GET",
  });
};

export const fetchTicketDetailsApi = (
  id: number
): AxiosPromise<HttpResponse<Ticket>> => {
  return request({
    url: `dat-phong/${id}`,
    method: "GET",
  });
};

export const bookTicketApi = (
  data: Ticket
): AxiosPromise<HttpResponse<Ticket>> => {
  return request({
    url: `/dat-phong`,
    method: "POST",
    data,
  });
};
