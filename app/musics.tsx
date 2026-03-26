import { useGetSongsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { NavidromeSongType } from "../state/api";
const Musics = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const { isLoading, data, isError, error } = useGetSongsQuery(
    {
      user: auth.username,
      url: auth.serverUrl,
      password: auth.password,
    },
    {
      skip: !auth.username || !auth.serverUrl,
    },
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginTop: 10 }}>Chargement des musiques...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "red", textAlign: "center" }}>
          Erreur : {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {data && data.length > 0 ? (
        <ListSongs songs={data} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Aucune musique trouvée.</Text>
        </View>
      )}
    </View>
  );
};

interface SongProps {
  song: NavidromeSongType;
  onSongTouch: (e: NavidromeSongType) => void;
}

const Song = ({ song, onSongTouch }: SongProps) => {
  const handleOnPress = () => {
    onSongTouch(song);
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            marginRight: 10,
            borderRadius: 4,
            height: 50,
            width: 50,
          }}
        />

        <View
          style={{
            paddingBottom: 5,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#000" }}>
            {song.title}
          </Text>
          <Text style={{ color: "gray", fontSize: 14 }}>{song.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface ListSongProps {
  songs: NavidromeSongType[];
}
const ListSongs = ({ songs }: ListSongProps) => {
  const router = useRouter();
  // navigate to the player
  const handleSongTouch = (song: NavidromeSongType) => {
    // Navigate to media player ...
    console.info(song);
    router.navigate({ pathname: "/player", params: song });
  };
  return (
    <View>
      {songs.map((song) => (
        <Song
          onSongTouch={(song) => handleSongTouch(song)}
          key={song.id}
          song={song}
        />
      ))}
    </View>
  );
};
export default Musics;
