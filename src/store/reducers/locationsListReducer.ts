import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading.context";
import { CreateLocationThunk, Location } from "../../interfaces/location";
import { LocationPOST } from "../../interfaces/locationPOST";
import {
  createLocationApi,
  deleteLocationApi,
  fetchLocationsListApi,
} from "../../services/locations";

export const fetchLocationsListAction = createAsyncThunk(
  "locationsList/fetchLocationsList",
  async () => {
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    setIsLoading({ isLoading: true, setIsLoading });

    const response = await fetchLocationsListApi();

    setIsLoading({ isLoading: false, setIsLoading });

    // console.log(response);

    return response.data.content;
  }
);

export const createLocationAction = createAsyncThunk(
  "locationsList/createLocation",
  async (data: CreateLocationThunk) => {
    // await createLocationApi(data);

    const response = await createLocationApi(data.submitData);

    const newLocationsList = await fetchLocationsListApi();

    notification.success({
      message: "Thêm vị trí thành công",
    });

    data.callback("/admin");

    return newLocationsList.data.content;
  }
);

export const deleteLocationAction = createAsyncThunk(
  "locationsList/deleteLocation",
  async (id: number) => {
    const response = await deleteLocationApi(id);

    const newLocationsList = await fetchLocationsListApi();

    notification.success({
      message: "Xóa vị trí thành công",
    });

    return newLocationsList.data.content;
  }
);

interface LocationsListState {
  locationsList: Location[];
  loading: "pending" | "succeeded";
}

const INITIAL_STATE: LocationsListState = {
  locationsList: [],
  loading: "pending",
};

const locationsListSlice = createSlice({
  name: "locationsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLocationsListAction.pending,
      (state: LocationsListState) => {
        console.log("pending");
        state.loading = "pending";
      }
    );
    builder.addCase(
      fetchLocationsListAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        console.log("succeeded");
        state.locationsList = action.payload;
        state.loading = "succeeded";
      }
    );
    builder.addCase(
      createLocationAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        state.locationsList = action.payload;
      }
    );
    builder.addCase(
      deleteLocationAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        state.locationsList = action.payload;
      }
    );
  },
});

export const locationsListActions = locationsListSlice.actions;
export const locationsListReducer = locationsListSlice.reducer;
