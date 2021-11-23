import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/AuthSlice";
import PostSlice from "./Features/PostSlice";
import SignupSlice from "./Features/SignupSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    post: PostSlice,
    signup: SignupSlice
  }
})

export default store