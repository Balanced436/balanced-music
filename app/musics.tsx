import { useGetSongsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {NavidromeSongType} from '../state/api'
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
      {data?.map((song) => {
        return <Song key={song.id} song={song}/>;
      })}
    </View>
  );
};


interface SongProps {
  song: NavidromeSongType
}

const Song = ({ song }: SongProps) => {
  return (
      <View style={{
        display:"flex",
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: "center"
      }}>
        {/* La Cover : Square avec la même hauteur que le texte */}
        <View style={{
          backgroundColor: "gray",
          marginRight: 10,
          borderRadius: 4 ,
          height: 50,
          width: 50
        }} />

        <View style={{
          paddingBottom: 5,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        }}>
          <Text style={{ fontWeight: '600', fontSize: 16, color: '#000' }}>
            {song.title}
          </Text>
          <Text style={{ color: 'gray', fontSize: 14 }}>
            {song.artist}
          </Text>
        </View>
      </View>
  );
};


interface ListSongProps {
  songs: NavidromeSongType[]
}
const ListSongs=({songs}: ListSongProps) =>{
  return <View></View>
}
export default Musics;
