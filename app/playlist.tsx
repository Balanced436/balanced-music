import { NavidromeSongType } from "@/state/api";
import { setFullScreenVisibility, setSongIndex } from "@/state/playlist-slice";
import { RootState } from "@/state/store";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListSongs } from "../components/ui/list-songs";

const Playlist = () => {
  const { currentPlaylist } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch();

  if (!currentPlaylist) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No playlist selected.</Text>
      </View>
    );
  }

  const handleSongTouch = (song: NavidromeSongType, index: number) => {
    dispatch(setSongIndex(index));
    dispatch(setFullScreenVisibility(true));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 16 }}>
        {currentPlaylist.title}
      </Text>

      <ListSongs onSongTouch={handleSongTouch} songs={currentPlaylist.songs} />
    </View>
  );
};

export default Playlist;
