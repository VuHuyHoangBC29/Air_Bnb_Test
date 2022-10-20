import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocationDetailsAction } from "../../store/reducers/locationDetailsReducer";
import { fetchRoomDetailsAction } from "../../store/reducers/roomDetailsReducer";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCommentsListAction } from "../../store/reducers/commentsListReducer";
import RoomTitle from "../../modules/booking/roomTitle";
import RoomDetails from "../../modules/booking/roomDetails";

export default function Booking() {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };

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

  useEffect(() => {
    dispatch(fetchCommentsListAction());
  }, []);

  return (
    <div>
      <RoomTitle />

      <RoomDetails />
    </div>
  );
}
