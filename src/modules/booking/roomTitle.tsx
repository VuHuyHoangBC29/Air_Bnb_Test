import { Carousel, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocationDetailsAction } from "../../store/reducers/locationDetailsReducer";
import { fetchRoomDetailsAction } from "../../store/reducers/roomDetailsReducer";
import { AppDispatch, RootState } from "../../store/store";

export default function RoomTitle(): JSX.Element {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.roomId) {
      dispatch(fetchRoomDetailsAction(+params.roomId));
    }
  }, [params.roomId]);

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  useEffect(() => {
    if (roomDetails) {
      dispatch(fetchLocationDetailsAction(roomDetails.maViTri));
    }
  }, [roomDetails]);

  const { locationDetails } = useSelector(
    (state: RootState) => state.locationDetailsReducer
  );

  return (
    <div id="roomTitle">
      <h4>{roomDetails?.tenPhong}</h4>
      {roomDetails?.moTa.includes("Chủ nhà siêu cấp") && (
        <p>Chủ nhà siêu cấp</p>
      )}
      <p>
        {locationDetails?.tenViTri}, {locationDetails?.tinhThanh},{" "}
        {locationDetails?.quocGia}
      </p>

      <div id="roomCarousel">
        <Carousel>
          <div>
            <Image height={"80vh"} width={"100%"} src={roomDetails?.hinhAnh} />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
