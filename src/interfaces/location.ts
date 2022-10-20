export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface CreateLocationThunk {
  submitData: Location;
  callback: Function;
}

export interface UpdateLocationApi {
  submitData: Location;
  id: number;
}

export interface UpdateLocationThunk {
  submitData: UpdateLocationApi;
  callback: Function;
}
