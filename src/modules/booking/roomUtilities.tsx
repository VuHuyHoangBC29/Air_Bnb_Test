import { Avatar, List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function RoomUtilities() {
  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  let roomUtilsArr: string[] = [];

  const roomUtil = {
    banLa: "Bàn là",
    banUi: "Bàn ủi",
    bep: "Bếp",
    dieuHoa: "Điều hòa",
    doXe: "Đỗ xe",
    hoBoi: "Hồ bơi",
    mayGiat: "Máy giặt",
    tivi: "Tivi",
    wifi: "Wifi",
  };

  for (const property in roomDetails) {
    if (
      property === "id" ||
      property === "moTa" ||
      property === "hinhAnh" ||
      property === "tenPhong" ||
      property === "giaTien" ||
      property === "maViTri" ||
      property === "khach" ||
      property === "phongNgu" ||
      property === "phongTam" ||
      property === "giuong"
    ) {
      roomUtilsArr = [...roomUtilsArr];
    } else if (roomDetails[property as keyof typeof roomDetails] === false) {
      roomUtilsArr = [...roomUtilsArr];
    } else {
      roomUtilsArr.push(roomUtil[property as keyof typeof roomUtil]);
    }
  }

  const roomUtilsData = roomUtilsArr.map((ele, idx) => {
    return {
      title: ele,
    };
  });

  return (
    <div>
      <h5>Tiện nghi</h5>
      <List
        style={{ width: "30%" }}
        grid={{ gutter: 32, column: 2 }}
        dataSource={roomUtilsData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<p>{item.title}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
