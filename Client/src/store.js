import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./HomeSlice";

export default configureStore({
  reducer: {
    role: homeReducer,
  },
});
