import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
const store = configureStore({
  reducer: {
    auth : authSlice,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch

export default store;

