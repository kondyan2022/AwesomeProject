import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentToPostThunk,
  addLikeThunk,
  addPostThunk,
  fetchAllThunk,
  removeLikeThunk,
} from "./thunk";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isPending: false,
    error: null,
  },
  reducers: {
    addPost(state, { payload }) {
      state.posts.unshift(payload);
    },
    updatePost(state, { payload }) {
      state.posts = state.posts.map((post) =>
        post.id === payload.id ? payload : post
      );
    },
    clearPosts(state, { payload }) {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addPostThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(addPostThunk.rejected, (state, { payload }) => {
        state.isPending = false;
        state.error = payload;
      })
      .addCase(fetchAllThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(fetchAllThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        // console.log("fetchAllThunk.fulfilled", payload);
        state.posts = payload;
      })
      .addCase(fetchAllThunk.rejected, (state, { payload }) => {
        state.isPending = false;

        state.error = payload;
      })
      .addCase(addCommentToPostThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addCommentToPostThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(addCommentToPostThunk.rejected, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(addLikeThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addLikeThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(addLikeThunk.rejected, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(removeLikeThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(removeLikeThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
      })
      .addCase(removeLikeThunk.rejected, (state, { payload }) => {
        state.isPending = false;
      });
  },
});

export const { addPost, updatePost, clearPosts } = postsSlice.actions;
