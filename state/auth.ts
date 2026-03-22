import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  serverUrl: string;
  username: string;
  isConnected: boolean;
}

const initialState: AuthState = {
  serverUrl: "",
  username: "",
  isConnected: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ url: string; user: string }>,
    ) => {
      state.serverUrl = action.payload.url;
      state.username = action.payload.user;
      state.isConnected = true;
    },
    logout: (state) => {
      state.serverUrl = "";
      state.username = "";
      state.isConnected = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
