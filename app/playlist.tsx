import { RootState } from "@/state/store";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ListSongs } from "../components/ui/list-songs";

const Playlist = () => {
  const { currentPlaylist } = useSelector((state: RootState) => state.playlist);

  if (!currentPlaylist) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No playlist selected.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 16 }}>
        {currentPlaylist.title}
      </Text>

      <ListSongs songs={currentPlaylist.songs} />
    </View>
  );
};

export default Playlist;
