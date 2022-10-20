export interface Ticket {
  id: number;
  maPhong: number | undefined;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number | undefined;
}

export interface BookTicket {
  submitData: Ticket;
  callback: Function;
}
