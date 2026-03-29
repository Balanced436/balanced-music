import { useGetSongsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ListSongs } from "../components/ui/list-songs";

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

export default Musics;
