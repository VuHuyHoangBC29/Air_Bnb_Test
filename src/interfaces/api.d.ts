declare type HttpResponse<D> = {
  statusCode: number;
  content: D;
  dateTime: string;
};

declare type HttpResponsePhanTrang<D, T> = {
  statusCode?: number;
  content: D;
  data: T;
  dateTime?: string;
};
