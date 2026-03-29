import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import md5 from "md5";
import { useEffect } from "react";
import { View } from "react-native";
import { IconButton, ProgressBar, Text } from "react-native-paper";
import { useSelector } from "react-redux";

const Player = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const metada = useLocalSearchParams<NavidromeSongType>();
  const streamingUrl = new URL(`${auth.serverUrl}/rest/stream.view`);
  const s = Math.random().toString(36).substring(2);
  const t = md5(auth.password + s);

  streamingUrl.searchParams.append("u", auth.username);
  streamingUrl.searchParams.append("s", s);
  streamingUrl.searchParams.append("t", t);
  streamingUrl.searchParams.append("v", "1.16.1");
  streamingUrl.searchParams.append("c", "MyReactMusicApp");
  streamingUrl.searchParams.append("id", metada.id);
  console.info(streamingUrl);

  return (
    <View>
      <AudioPlayer metada={metada} uri={streamingUrl}></AudioPlayer>
    </View>
  );
};

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
  uri: URL;
  metada?: NavidromeSongType;
}

const AudioPlayer = ({ uri, metada }: AudioPlayerProps) => {
  const audioSource = uri.toString();

  const player = useAudioPlayer(audioSource);

  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!status.playing) {
      player.play();
    }
  }, [player]);

  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  return (
  <View style={{ padding: 10, flexDirection: "column", height: "100%" }}>
    <View style={{ backgroundColor: "gray", flex: 1 }}>
    </View>
    <View style={{ paddingVertical: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20
        }}
      >
        <IconButton icon="repeat" selected={player.loop} onPress={(e)=>player.loop = !player.loop}></IconButton>
        
        <View style={{flexDirection: "row"}}>
        <IconButton
          icon="skip-previous"
          onPress={() => player.seekTo(Math.max(0, status.currentTime - 30))}
        />

        {status.playing ? (
          <IconButton icon="pause" onPress={() => player.pause()} />
        ) : (
          <IconButton icon="play" onPress={() => player.play()} />
        )}

        <IconButton
          icon="skip-next"
          onPress={() =>
            player.seekTo(Math.min(status.duration, status.currentTime + 30))
          }
        />

        </View>
      <IconButton icon="shuffle"></IconButton>
      </View>

      <View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{metada?.title}</Text>
          <Text style={{ color: 'gray' }}>{metada?.album}</Text>
        </View>
        
        <ProgressBar progress={progress} color="#007AFF" />
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>{formatTime(status.currentTime)}</Text>
          <Text style={{ fontSize: 12 }}>{formatTime(status.duration)}</Text>
        </View>
      </View>
    </View>
  </View>
);
};

export default Player;
