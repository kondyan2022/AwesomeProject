import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { signInUserThunk, signOutUserThunk, signUpUserThunk } from "./thunk";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userProfile: {
      displayName: null,
      photoURL: null,
      email: null,
    },
    isPending: false,
    error: null,
  },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    },
    updateUserProfile(state, { payload }) {
      state.userProfile = { ...state.userProfile, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserThunk.pending, (state, { action }) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(signUpUserThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.userProfile = { ...state.userProfile, ...payload };
      })
      .addCase(signUpUserThunk.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      })
      .addCase(signInUserThunk.pending, (state, action) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(signInUserThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        // state.userProfile = { ...state.userProfile, ...payload };
      })
      .addCase(signInUserThunk.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      })
      .addCase(signOutUserThunk.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(signOutUserThunk.fulfilled, (state) => {
        state.isPending = false;
        state.userProfile = initialState.userProfile;
      })
      .addCase(signOutUserThunk.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export const { setIsAuth, updateUserProfile } = authSlice.actions;
