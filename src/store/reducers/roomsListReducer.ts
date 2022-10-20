import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { CreateRoomThunk, Room } from "../../interfaces/room";
import {
  createRoomApi,
  deleteRoomApi,
  fetchRoomsListApi,
} from "../../services/room";

export const fetchRoomsListAction = createAsyncThunk(
  "roomsList/fetchRoomsList",
  async () => {
    const response = await fetchRoomsListApi();

    console.log(response);

    return response.data.content;
  }
);

export const createRoomAction = createAsyncThunk(
  "roomsList/createRoom",
  async (data: CreateRoomThunk) => {
    const response = await createRoomApi(data.submitData);

    console.log(response);

    notification.success({
      message: "Thêm phòng thành công!",
    });

    data.callback("/admin/room-management");

    return response.data.content;
  }
);

export const deleteRoomAction = createAsyncThunk(
  "roomsList/deleteRoom",
  async (id: number) => {
    const response = await deleteRoomApi(id);

    const newRoomsList = await fetchRoomsListApi();

    return newRoomsList.data.content;
  }
);

interface RoomsListState {
  roomsList: Room[];
}

const INITIAL_STATE: RoomsListState = {
  roomsList: [],
};

const roomsListSlice = createSlice({
  name: "roomsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRoomsListAction.fulfilled,
      (state: RoomsListState, action: PayloadAction<Room[]>) => {
        console.log("fulfilled");
        state.roomsList = action.payload;
      }
    );
    builder.addCase(
      createRoomAction.fulfilled,
      (state: RoomsListState, action: PayloadAction<Room>) => {
        let newRoomsList = [...state.roomsList];

        state.roomsList = newRoomsList;
      }
    );
    builder.addCase(
      deleteRoomAction.fulfilled,
      (state: RoomsListState, action: PayloadAction<Room[]>) => {
        state.roomsList = action.payload;
      }
    );
  },
});

export const roomsListActions = roomsListSlice.actions;
export const roomsListReducer = roomsListSlice.reducer;
