import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { Location, UpdateLocationThunk } from "../../interfaces/location";
import {
  fetchLocationDetailsApi,
  updateLocationApi,
} from "../../services/locations";

export const fetchLocationDetailsAction = createAsyncThunk(
  "locationDetails/fetchLocationDetails",
  async (id: number) => {
    const response = await fetchLocationDetailsApi(id);

    console.log(response);

    return response.data.content;
  }
);

export const updateLocationAction = createAsyncThunk(
  "locationDetails/updateLocation",
  async (data: UpdateLocationThunk) => {
    const response = await updateLocationApi(data.submitData);

    notification.success({
      message: "Cập nhật thành công!",
    });

    data.callback("/admin/location-management");

    return response.data.content;
  }
);

interface LocationDetailsState {
  locationDetails: Location | null;
}

const INITIAL_STATE: LocationDetailsState = {
  locationDetails: null,
};

const locationDetailsSlice = createSlice({
  name: "locationDetails",
  initialState: INITIAL_STATE,
  reducers: {
    handleRemoveLocationDetail(
      state: LocationDetailsState,
      action: PayloadAction<null>
    ) {
      state.locationDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLocationDetailsAction.fulfilled,
      (state: LocationDetailsState, action: PayloadAction<Location>) => {
        console.log("fulfilled");

        state.locationDetails = action.payload;
      }
    );
    builder.addCase(
      updateLocationAction.fulfilled,
      (state: LocationDetailsState, action: PayloadAction<Location>) => {
        state.locationDetails = action.payload;
      }
    );
  },
});

export const locationDetailsActions = locationDetailsSlice.actions;
export const locationDetailsReducer = locationDetailsSlice.reducer;
