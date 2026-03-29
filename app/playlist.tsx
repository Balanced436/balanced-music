import AudioPlayer from "@/components/ui/audio-player";
import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useSelector } from "react-redux";
import { ListSongs } from "../components/ui/list-songs";

const Playlist = () => {
  const { currentPlaylist } = useSelector((state: RootState) => state.playlist);
  const [currentIndexSong, setCurrentIndexSong] = useState(0);
  const [isPlayerModalVisible, setPlayerModalVisibility] = useState(false);

  if (!currentPlaylist) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No playlist selected.</Text>
      </View>
    );
  }

  const handleSongTouch = (song: NavidromeSongType, index: number) => {
    // open audio player
    console.info(index, song);
    setCurrentIndexSong(index);
    setPlayerModalVisibility(true);
  };
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 16 }}>
        {currentPlaylist.title}
      </Text>

      <ListSongs onSongTouch={handleSongTouch} songs={currentPlaylist.songs} />
      <Portal>
        <Modal
          visible={isPlayerModalVisible}
          onDismiss={() => setPlayerModalVisibility(false)}
          contentContainerStyle={containerStyle}
        >
          <AudioPlayer
            songIndex={currentIndexSong}
            playlist={currentPlaylist}
          ></AudioPlayer>
        </Modal>
      </Portal>
    </View>
  );
};

export default Playlist;
