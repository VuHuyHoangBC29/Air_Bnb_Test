import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function RoomTraits() {
  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const roomTraitsData = [
    {
      // description: `${roomDetails?.moTa.replaceAll("\r\n", "<br/>")}`,
      title: roomDetails?.moTa.split("\r\n").map((ele, idx) => {
        if (idx % 2 === 0) {
          return <p style={{ fontWeight: "bold" }}>{ele}</p>;
        } else {
          return <p>{ele}</p>;
        }
      }),
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={roomTraitsData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
}
