import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;
