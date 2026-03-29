import { NavidromeSongType } from "@/state/api";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

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
export const ListSongs = ({ songs }: ListSongProps) => {
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
