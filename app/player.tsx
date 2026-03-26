import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import md5 from "md5";
import { useEffect } from "react";
import { Button, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
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

  const pad = (num: number) => num.toString().padStart(2, '0');

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

  const progress = status.duration > 0 ? status.currentTime / status.duration : 0;

return (
  <View style={{ padding: 20 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
      <Button 
        title="-10s" 
        onPress={() => player.seekTo(Math.max(0, status.currentTime - 30))} 
      />
      
      <Button 
        title={status.playing ? "Pause" : "Play"} 
        onPress={() => status.playing ? player.pause() : player.play()} 
      />
      
      <Button 
        title="+10s" 
        onPress={() => player.seekTo(Math.min(status.duration, status.currentTime + 30))} 
      />
    </View>

    <View>
      <View>
        <Text>{metada?.title}</Text>
        <Text>{metada?.album}</Text>
      </View>
      <ProgressBar progress={progress} color="#007AFF" />
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
        <Text style={{ fontSize: 12 }}>{formatTime(status.currentTime)}</Text>
        <Text style={{ fontSize: 12 }}>{formatTime(status.duration)}</Text>
      </View>
    </View>
  </View>
);
};

export default Player;
