import { UserAddOutlined } from "@ant-design/icons";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { USER_INFO_KEY, USER_TOKEN } from "../../constants/common";
import { RegisterUserThunk, User } from "../../interfaces/user";
import { UserLogin } from "../../interfaces/userLogin";
import { loginApi } from "../../services/authentication";
import { registerUserApi } from "../../services/user";

export const loginAction = createAsyncThunk(
  "userAuthentication/userLogin",
  async (data: UserLogin) => {
    const response = await loginApi(data);

    console.log(response.data.content);

    localStorage.setItem(USER_INFO_KEY, JSON.stringify(response.data.content));

    // localStorage.setItem(USER_TOKEN, response.data.content.token);

    notification.success({
      message: "Đăng nhập thành công!",
    });

    return response.data.content.user;
  }
);

export const registerUserAction = createAsyncThunk(
  "userAuthentication/registerUser",
  async (data: RegisterUserThunk) => {
    const response = await registerUserApi(data.submitData);

    console.log(response);

    notification.success({
      message: "Đăng ký thành công!",
    });

    data.callback("/login");
  }
);

let userInfo = localStorage.getItem(USER_INFO_KEY);

if (userInfo) {
  userInfo = JSON.parse(userInfo);
}

interface UserState {
  userInfo: User | null;
}

const INITIAL_STATE: UserState = {
  userInfo: null,
};

const authenticationSlice = createSlice({
  name: "userAuthentication",
  initialState: INITIAL_STATE,
  reducers: {
    handleLogout(state: UserState, action: PayloadAction<null>) {
      state.userInfo = action.payload;

      let keysToRemove = [USER_INFO_KEY, USER_TOKEN];

      for (let key of keysToRemove) {
        localStorage.removeItem(key);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAction.fulfilled,
      (state: UserState, action: PayloadAction<User>) => {
        console.log("fulfilled");

        state.userInfo = action.payload;
      }
    );
  },
});

export const authenticationActions = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
