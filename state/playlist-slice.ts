import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavidromeSongType } from "./api";

interface PlaylistState {
  currentPlaylist: {
    title: string;
    songs: NavidromeSongType[];
  } | null;

  fullScreenPlayer: boolean
  miniPlayer:boolean
}

const initialState: PlaylistState = {
  currentPlaylist: null,
  fullScreenPlayer: false,
  miniPlayer: false
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentPlaylist: (
      state,
      action: PayloadAction<{ title: string; songs: NavidromeSongType[] }>,
    ) => {
      state.currentPlaylist = action.payload;
    },
    setFullScreenVisibility: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.fullScreenPlayer = action.payload;
    },
    },

});

export const { setCurrentPlaylist, setFullScreenVisibility } = playlistSlice.actions;
