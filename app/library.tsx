import { NavidromeSongType, useGetSongsQuery } from '@/state/api';
import { setCurrentPlaylist } from '@/state/playlist-slice';
import { RootState } from '@/state/store';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export type Playlist = {
    title: string,
    songs: NavidromeSongType[]
}

const Library = () => {
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()


    const { isLoading, data = [] } = useGetSongsQuery(
        {
            user: auth.username,
            url: auth.serverUrl,
            password: auth.password,
        },
        {
            skip: !auth.username || !auth.serverUrl,
        },
    );

    const playlists: Playlist[] = [{
        title: "All your songs",
        songs: data,
    }];

    return (
        <View style={styles.container}>
            {playlists.map((playlist, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.playlistItem}
                    onPress={() => {
                      // just update internal state playlist
                        dispatch(setCurrentPlaylist(playlist))
                        router.navigate("/playlist",);
                    }}
                >
                    <Text style={styles.playlistText}>{playlist.title}</Text>
                    <Text style={styles.subtitle}>{playlist.songs.length} songs</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    playlistItem: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    playlistText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    }
});

export default Library;