import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { BookTicket, Ticket } from "../../interfaces/ticket";
import { bookTicketApi, fetchTicketListApi } from "../../services/ticket";

export const fetchTicketsListAction = createAsyncThunk(
  "ticketsList/fetchTicketsList",
  async () => {
    const response = await fetchTicketListApi();

    return response.data.content;
  }
);

export const bookTicketAction = createAsyncThunk(
  "ticketsList/bookTicket",
  async (data: BookTicket) => {
    const response = await bookTicketApi(data.submitData);

    notification.success({
      message: "Đặt vé thành công!",
    });

    data.callback("/");

    return response.data.content;
  }
);

interface TicketsListState {
  ticketsList: Ticket[];
}

const INITIAL_STATE: TicketsListState = {
  ticketsList: [],
};

const ticketsListSlice = createSlice({
  name: "ticketsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTicketsListAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket[]>) => {
        state.ticketsList = action.payload;
      }
    );
    builder.addCase(
      bookTicketAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket>) => {
        let newTicketsList = [...state.ticketsList];

        newTicketsList.push(action.payload);

        state.ticketsList = newTicketsList;
      }
    );
  },
});

export const ticketsListActions = ticketsListSlice.actions;
export const ticketsListReducer = ticketsListSlice.reducer;
