import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import { useLocalSearchParams } from "expo-router";
import md5 from "md5";
import { View } from "react-native";
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

  return <View></View>;
};

export default Player;
