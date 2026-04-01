import { Playlist } from "@/app/library";
import { useGlobalPlayer } from "@/providers/player-context";
import { setFullScreenVisibility, setSongIndex } from "@/state/playlist-slice";
import { RootState } from "@/state/store";
import { useAudioPlayerStatus } from "expo-audio/build/ExpoAudio";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { IconButton, Modal, ProgressBar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`;
  }

  return `${m}:${pad(s)}`;
};

interface AudioPlayerProps {
  playlist: Playlist;
  songIndex?: number;
  onMinimize: () => void;
}

/**
 * Audio player component managing a playlist
 * * @component
 * @param {AudioPlayerProps} props - Component properties.
 * @param {Playlist} props.playlist - The playlist object containing the title and song array.
 * @param {number} [props.songIndex=0] - The starting index of the song to be played.
 */
const AudioPlayer = () => {
  const { currentPlaylist, fullScreenPlayer, songIndex } = useSelector(
    (state: RootState) => state.playlist,
  );
  const songs = currentPlaylist?.songs || [];
  const playlistTitle = currentPlaylist?.title || "";
  const dispatch = useDispatch();
  const player = useGlobalPlayer();
  if (!player) return;
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    const song = currentPlaylist?.songs[songIndex];
    if (song) {
      player.replace(song.streamingUrl);
      player.setActiveForLockScreen(true, {
      title: currentPlaylist?.songs[songIndex].title,
      artist: currentPlaylist?.songs[songIndex].artist,
      albumTitle: currentPlaylist?.songs[songIndex].album,
      })
      player.play();
    }
  }, [songIndex, player]);

  const playNext = () => {
    if (songIndex < songs.length - 1) {
      dispatch(setSongIndex(songIndex + 1));
    }
  };

  const playPrevious = () => {
    if (songIndex > 0) {
      dispatch(setSongIndex(songIndex - 1));
    }
  };
  useEffect(() => {
    if (status.didJustFinish) {
      playNext();
    }
  }, [status.didJustFinish]);

  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return <Modal
        visible={fullScreenPlayer}
        onDismiss={() => dispatch(setFullScreenVisibility(false))}
        contentContainerStyle={containerStyle}
      >
        <View style={{ padding: 10, flexDirection: "column", height: "100%" }}>
          <View
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ position: "absolute", left: 0 }}>
              <IconButton
                icon="chevron-down"
                onPress={() => dispatch(setFullScreenVisibility(false))}
              />
            </View>

            <Text style={{ color: "gray", fontWeight: "600" }}>
              {playlistTitle}
            </Text>
          </View>
          <View style={{ backgroundColor: "gray", flex: 1 }}></View>
          <View style={{ paddingVertical: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 20,
              }}
            >
              <IconButton
                icon="repeat"
                selected={player.loop}
                onPress={(e) => (player.loop = !player.loop)}
              ></IconButton>

              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon="skip-previous"
                  onPress={() => {
                    playPrevious();
                  }}
                />

                {status.playing ? (
                  <IconButton icon="pause" onPress={() => player.pause()} />
                ) : (
                  <IconButton icon="play" onPress={() => player.play()} />
                )}

                <IconButton icon="skip-next" onPress={() => playNext()} />
              </View>
              <IconButton icon="shuffle"></IconButton>
            </View>

            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {currentPlaylist?.songs[songIndex].title}
                </Text>
                <Text style={{ color: "gray" }}>
                  {currentPlaylist?.songs[songIndex].album}
                </Text>
              </View>

              <ProgressBar progress={progress} color="#007AFF" />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {formatTime(status.currentTime)}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {formatTime(status.duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
};

export default AudioPlayer;
