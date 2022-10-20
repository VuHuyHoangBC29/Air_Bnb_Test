import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkDispatch } from "redux-thunk";
import { locationsListReducer } from "./reducers/locationsListReducer";
import { locationDetailsReducer } from "./reducers/locationDetailsReducer";
import { usersListReducer } from "./reducers/usersListReducer";
import { authenticationReducer } from "./reducers/authenicationReducer";
import { userDetailsReducer } from "./reducers/userDetailsReducer";
import { roomsListReducer } from "./reducers/roomsListReducer";
import { roomDetailsReducer } from "./reducers/roomDetailsReducer";
import { commentsListReducer } from "./reducers/commentsListReducer";

const rootReducer = combineReducers({
  authenticationReducer,
  locationsListReducer,
  locationDetailsReducer,
  usersListReducer,
  userDetailsReducer,
  roomsListReducer,
  roomDetailsReducer,
  commentsListReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: [
        "locationsListReducer",
        "authenticationReducer",
        "usersListReducer",
        "userDetailsReducer",
        "roomsListReducer",
        "roomDetailsReducer",
        "commentsListReducer",
      ],
    },
    rootReducer
  ),
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store["getState"]>;

export type AppDispatch = typeof store["dispatch"] &
  ThunkDispatch<RootState, void, AnyAction>;
