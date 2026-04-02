import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGlobalPlayer } from "@/providers/player-context";
import { ProgressBar, Surface } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useAudioPlayerStatus } from "expo-audio/build/ExpoAudio";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setFullScreenVisibility } from "@/state/playlist-slice";

export const MiniAudioPlayer = () => {
  const player = useGlobalPlayer();
  if (!player) return null;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { currentPlaylist, songIndex, fullScreenPlayer } = useSelector(
    (state: RootState) => state.playlist,
  );

  const status = useAudioPlayerStatus(player);
  if (!status.playing) {
    return;
  }
  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => dispatch(setFullScreenVisibility(true))}
      style={[styles.absoluteWrapper, { bottom: 50 + insets.bottom }]}
    >
      <Surface elevation={1} style={styles.surface}>
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {currentPlaylist?.songs[songIndex]?.title}
          </Text>
          <ProgressBar
            progress={progress}
            color="#007AFF"
            style={styles.progress}
          />
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 60,
    paddingHorizontal: 10,
  },
  surface: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  content: {
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  progress: {
    height: 3,
    borderRadius: 2,
  },
});
