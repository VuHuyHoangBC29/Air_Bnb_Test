import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../interfaces/comment";
import {
  createCommentApi,
  deleteCommentApi,
  fetchCommentsListApi,
} from "../../services/comment";

export const fetchCommentsListAction = createAsyncThunk(
  "commentsList/fetchCommentsList",
  async () => {
    const response = await fetchCommentsListApi();

    console.log(response);

    return response.data.content;
  }
);

export const createCommentAction = createAsyncThunk(
  "commentsList/createComment",
  async (data: Comment) => {
    const response = await createCommentApi(data);

    console.log(response);

    return response.data.content;
  }
);

export const deleteCommentAction = createAsyncThunk(
  "commentsList/deleteComment",
  async (id: number) => {
    const response = await deleteCommentApi(id);

    const newCommentsList = await fetchCommentsListApi();

    return newCommentsList.data.content;
  }
);

interface CommentsListState {
  commentsList: Comment[];
}

const INITIAL_STATE: CommentsListState = {
  commentsList: [],
};

const commentsListSlice = createSlice({
  name: "commentsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommentsListAction.fulfilled,
      (state: CommentsListState, action: PayloadAction<Comment[]>) => {
        console.log("fulfilled");

        state.commentsList = action.payload;
      }
    );
    builder.addCase(
      createCommentAction.fulfilled,
      (state: CommentsListState, action: PayloadAction<Comment>) => {
        let newCommentsList = [...state.commentsList];

        newCommentsList.push(action.payload);

        state.commentsList = newCommentsList;
      }
    );
    builder.addCase(
      deleteCommentAction.fulfilled,
      (state: CommentsListState, action: PayloadAction<Comment[]>) => {
        state.commentsList = action.payload;
      }
    );
  },
});

export const commentsListActions = commentsListSlice.actions;
export const commentsListReducer = commentsListSlice.reducer;
