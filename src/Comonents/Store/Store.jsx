import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../GlobalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
