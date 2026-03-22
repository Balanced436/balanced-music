import { configureStore } from "@reduxjs/toolkit";
import { navidromeApi } from "./api";
import { authSlice } from "./auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [navidromeApi.reducerPath]: navidromeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(navidromeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
