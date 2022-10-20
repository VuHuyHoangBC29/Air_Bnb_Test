import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function RoomSummary() {
  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const roomSummaryData = [
    {
      title: `${roomDetails?.tenPhong}`,
      summary: `${roomDetails?.khach} khách - ${roomDetails?.phongNgu} phòng ngủ - ${roomDetails?.giuong} giường - ${roomDetails?.phongTam} phòng tắm`,
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={roomSummaryData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<h5>{item.title}</h5>}
            description={<p>{item.summary}</p>}
          />
        </List.Item>
      )}
    />
  );
}
