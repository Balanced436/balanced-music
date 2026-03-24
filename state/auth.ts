import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  serverUrl: string;
  username: string;
  isConnected: boolean;
  password: string;
}

const initialState: AuthState = {
  serverUrl: "",
  username: "",
  isConnected: false,
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ url: string; user: string; password: string }>,
    ) => {
      state.serverUrl = action.payload.url;
      state.username = action.payload.user;
      state.isConnected = true;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.serverUrl = "";
      state.username = "";
      state.isConnected = false;
      state.password = "";
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
