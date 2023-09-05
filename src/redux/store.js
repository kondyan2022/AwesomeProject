import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { postsSlice } from "./posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
  },
});
