import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavidromeSongType } from './api';

interface PlaylistState {
  currentPlaylist: {
    title: string;
    songs: NavidromeSongType[];
  } | null;
}

const initialState: PlaylistState = {
  currentPlaylist: null,
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<{title: string, songs: NavidromeSongType[]}>) => {
      state.currentPlaylist = action.payload;
    },
  },
});

export const { setCurrentPlaylist } = playlistSlice.actions;