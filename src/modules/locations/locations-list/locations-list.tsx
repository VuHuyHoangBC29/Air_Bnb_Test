import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";

export default function LocationsList() {
  const params = useParams();

  const [province, setProvince] = useState<string>(
    params.provinceId ? params.provinceId : "ALL"
  );

  const { roomsList } = useSelector(
    (state: RootState) => state.roomsListReducer
  );

  let filteredNewRoomsList = [...roomsList];

  if (province !== "ALL") {
    filteredNewRoomsList = roomsList.filter((ele) => ele.maViTri === +province);
  }

  const roomProperty = {
    banLa: "Bàn là",
    banUi: "Bàn ủi",
    bep: "Bếp",
    dieuHoa: "Điều hòa",
    doXe: "Đỗ xe",
    giaTien: "Giá tiền",
    giuong: "Giường",
    hinhAnh: "Hình ảnh",
    hoBoi: "Hồ bơi",
    id: "id",
    khach: "Khách",
    maViTri: "Mã vị trí",
    mayGiat: "Máy giặt",
    moTa: "Mô tả",
    phongNgu: "Phòng ngủ",
    phongTam: "Phòng tắm",
    tenPhong: "Tên phòng",
    tivi: "Tivi",
    wifi: "Wifi",
  };

  let roomContentArr: string[] = [];

  filteredNewRoomsList.forEach((ele, idx) => {
    let contentForEachRoom = "";
    for (const property in ele) {
      if (
        property === "id" ||
        property === "moTa" ||
        property === "hinhAnh" ||
        property === "tenPhong" ||
        property === "giaTien" ||
        property === "maViTri"
      ) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === false) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === true) {
        contentForEachRoom += roomProperty[property as keyof typeof ele] + ", ";
      } else {
        contentForEachRoom +=
          ele[property as keyof typeof ele] +
          " " +
          roomProperty[property as keyof typeof ele] +
          ", ";
      }
    }
    roomContentArr.push(contentForEachRoom);
  });

  const filteredNewRoomsListData = filteredNewRoomsList.map((ele, idx) => ({
    link: `/booking/${ele.id}`,
    title: ele.tenPhong,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: `$${ele.giaTien}/tháng `,
    content: `${roomContentArr[idx]}`,
    image: ele.hinhAnh,
  }));

  return (
    <div className="locationsList">
      <div className="roomInfo">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={filteredNewRoomsListData}
          renderItem={(item, idx) => (
            <List.Item
              style={{ paddingLeft: "0px" }}
              key={idx}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={item.image}
                  // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                // title={<a href={item.href}>{item.title}</a>}
                title={<Link to={item.link}>{item.title}</Link>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
