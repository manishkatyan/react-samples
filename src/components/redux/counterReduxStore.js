import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const counterReduxStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
