import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavidromeSongType } from "./api";

interface PlaylistState {
  currentPlaylist: {
    title: string;
    songs: NavidromeSongType[];
  } | null;

  fullScreenPlayer: boolean
  miniPlayer:boolean
  songIndex: number
}

const initialState: PlaylistState = {
  currentPlaylist: null,
  fullScreenPlayer: false,
  miniPlayer: false,
  songIndex: 0
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
        setSongIndex: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.songIndex = action.payload
    },
    },

});

export const { setCurrentPlaylist, setFullScreenVisibility, setSongIndex } = playlistSlice.actions;
