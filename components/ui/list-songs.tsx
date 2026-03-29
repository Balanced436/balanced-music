import { NavidromeSongType } from "@/state/api";
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

/**
 * Props for the ListSongs component.
 */
interface ListSongProps {
  /** Array of song objects retrieved from the Navidrome API. */
  songs: NavidromeSongType[];

  /** * Callback function triggered when a song is tapped.
   * @param song - The specific song object that was touched.
   * @param index - The position of the song within the playlist array.
   */
  onSongTouch: (song: NavidromeSongType, index: number) => void;
}

/**
 * Renders a vertical list of songs.
 * * This component maps through the provided songs and renders a individual
 * `Song` component for each entry. It handles the touch interaction by
 * providing the song data and its index back to the parent.
 */
export const ListSongs = ({ songs, onSongTouch }: ListSongProps) => {
  /**
   * Internal handler to bridge the Song touch event to the parent's callback.
   */
  const handleSongTouch = (song: NavidromeSongType, index: number) => {
    onSongTouch(song, index);
    // Note: Navigation is usually handled by the parent or via Redux
    // router.navigate({ pathname: "/player", params: song });
  };

  return (
    <View>
      {songs.map((song, index) => (
        <Song
          onSongTouch={(song) => handleSongTouch(song, index)}
          key={song.id}
          song={song}
        />
      ))}
    </View>
  );
};
