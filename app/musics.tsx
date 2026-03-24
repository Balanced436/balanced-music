import { useGetSongsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const Musics = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoading, data } = useGetSongsQuery({
    user: auth.username,
    url: auth.serverUrl,
    password: auth.password,
  });
  console.info(data);

  return (
    <View>
      <Text>Music list</Text>
      {data?.map((song) => {
        return <Text key={song.id}>{song.title}</Text>;
      })}
    </View>
  );
};

export default Musics;
