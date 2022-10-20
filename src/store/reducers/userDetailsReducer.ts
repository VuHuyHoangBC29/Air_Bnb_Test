import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { create } from "domain";
import {
  UpdateUser,
  UpdateUserApi,
  UpdateUserThunk,
  UpdateUserAvatar,
  User,
} from "../../interfaces/user";
import {
  fetchUserDetailedInfoApi,
  updateUserApi,
  updateUserAvatarApi,
} from "../../services/user";

export const fetchUserDetailedInfoAction = createAsyncThunk(
  "userDetails/fetchUserDetailedInfo",
  async (id: number) => {
    const response = await fetchUserDetailedInfoApi(id);

    console.log(response);

    return response.data.content;
  }
);

export const updateUserAction = createAsyncThunk(
  "userDetails/updateUser",
  async (data: UpdateUserThunk) => {
    const response = await updateUserApi(data.submitData);

    console.log(response);

    notification.success({
      message: "Cập nhật thành công!",
    });

    data.callback(`/${data.destination}`);

    return response.data.content;
  }
);

export const updateUserAvatarAction = createAsyncThunk(
  "userDetails/updateAvatar",
  async (data: FormData) => {
    const response = await updateUserAvatarApi(data);

    console.log(response);

    notification.success({
      message: "Cập nhật ảnh đại diện thành công!",
    });

    return response.data.content;
  }
);

interface UserDetailsState {
  userDetail: User | null;
  loading: boolean;
  // updateUser: UpdateUser | null;
}

const INITIAL_STATE: UserDetailsState = {
  userDetail: null,
  loading: false,
  // updateUser: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: INITIAL_STATE,
  reducers: {
    handleRemoveUserDetail(
      state: UserDetailsState,
      action: PayloadAction<null>
    ) {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserDetailedInfoAction.pending,
      (state: UserDetailsState) => {
        console.log("pending");
        state.loading = true;
      }
    );
    builder.addCase(
      fetchUserDetailedInfoAction.fulfilled,
      (state: UserDetailsState, action: PayloadAction<User>) => {
        console.log("fulfilled");

        state.userDetail = action.payload;

        state.loading = false;
      }
    );
    builder.addCase(
      updateUserAction.fulfilled,
      (state: UserDetailsState, action: PayloadAction<User>) => {
        console.log("fulfilled");

        state.userDetail = action.payload;
      }
    );
    builder.addCase(
      updateUserAvatarAction.fulfilled,
      (state: UserDetailsState, action: PayloadAction<User>) => {
        console.log("fulfilled");

        state.userDetail = action.payload;
      }
    );
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;
