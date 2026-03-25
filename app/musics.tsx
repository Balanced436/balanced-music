import { useGetSongsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { Text, View } from "react-native";
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
}

const Song = ({ song }: SongProps) => {
  return (
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
  );
};

interface ListSongProps {
  songs: NavidromeSongType[];
}
const ListSongs = ({ songs }: ListSongProps) => {
  return (
    <View>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </View>
  );
};
export default Musics;
