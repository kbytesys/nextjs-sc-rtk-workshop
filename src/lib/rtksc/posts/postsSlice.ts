import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getPosts, GetPostsResponse } from "@/lib/gorestapi";
import { AppStore } from "@/lib/rtksc/store";

export interface PostState {
  postList?: GetPostsResponse;
}

const initialState: PostState = {
  postList: undefined,
};

export const fetchPostsList = createAsyncThunk<GetPostsResponse, number | undefined>(
  "posts/fetchPostsList",
  async (page: number | undefined) => {
    return await getPosts(page);
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    initializePostList: (state, action: PayloadAction<GetPostsResponse | undefined>) => {
      state.postList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsList.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
      state.postList = action.payload;
    });
  },
  selectors: {
    postsListSelector: (state) => state?.postList,
  },
});

export const { initializePostList } = postsSlice.actions;
export const { postsListSelector } = postsSlice.selectors;

export default postsSlice.reducer;
