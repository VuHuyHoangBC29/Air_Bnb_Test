export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface CreateRoomThunk {
  submitData: Room;
  callback: Function;
}

export interface UpdateRoomApi {
  submitData: Room;
  id: number;
}

export interface UpdateRoomThunk {
  submitData: UpdateRoomApi;
  callback: Function;
}
