import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import { useAudioPlayer } from 'expo-audio';
import { useLocalSearchParams } from "expo-router";
import md5 from "md5";
import { Button, View } from 'react-native';
import { useSelector } from "react-redux";
 

const Player = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { id, title } = useLocalSearchParams<NavidromeSongType>();
  const streamingUrl = new URL(`${auth.serverUrl}/rest/stream.view`);
  const s = Math.random().toString(36).substring(2);
  const t = md5(auth.password + s);

  streamingUrl.searchParams.append("u", auth.username);
  streamingUrl.searchParams.append("s", s);
  streamingUrl.searchParams.append("t", t);
  streamingUrl.searchParams.append("v", "1.16.1");
  streamingUrl.searchParams.append("c", "MyReactMusicApp");
  streamingUrl.searchParams.append("id", id)
  console.info(streamingUrl)

    const player = useAudioPlayer(streamingUrl.toString(), {
    updateInterval: 1000,
    downloadFirst: true,
  });



  return (
<View>
      <Button title="Play Sound" onPress={() => player.play()} />
    </View>
  );
};

export default Player;
