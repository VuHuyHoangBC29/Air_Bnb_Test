import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { UpdateRoomThunk, Room } from "../../interfaces/room";
import { fetchRoomDetailsApi, updateRoomApi } from "../../services/room";

export const fetchRoomDetailsAction = createAsyncThunk(
  "roomDetails/fetchRoomDetails",
  async (id: number) => {
    const response = await fetchRoomDetailsApi(id);

    console.log(response);

    return response.data.content;
  }
);

export const updateRoomAction = createAsyncThunk(
  "roomDetails/updateRoom",
  async (data: UpdateRoomThunk) => {
    const response = await updateRoomApi(data.submitData);

    notification.success({
      message: "Cập nhật phòng thành công!",
    });

    data.callback("/admin/room-management");

    return response.data.content;
  }
);

interface RoomDetailsState {
  roomDetails: Room | null;
}

const INITIAL_STATE: RoomDetailsState = {
  roomDetails: null,
};

const roomDetailsSlice = createSlice({
  name: "roomDetails",
  initialState: INITIAL_STATE,
  reducers: {
    handleRemoveRoomDetails(
      state: RoomDetailsState,
      action: PayloadAction<null>
    ) {
      state.roomDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchRoomDetailsAction.fulfilled,
      (state: RoomDetailsState, action: PayloadAction<Room>) => {
        console.log("fulfilled");

        state.roomDetails = action.payload;
      }
    );
    builder.addCase(
      updateRoomAction.fulfilled,
      (state: RoomDetailsState, action: PayloadAction<Room>) => {
        state.roomDetails = action.payload;
      }
    );
  },
});

export const roomDetailsActions = roomDetailsSlice.actions;
export const roomDetailsReducer = roomDetailsSlice.reducer;
