import { NavidromeSongType } from "@/state/api";
import { RootState } from "@/state/store";
import { useLocalSearchParams } from "expo-router";
import md5 from "md5";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
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


  console.info(id, title);
  return (
    <AudioPlayer url={streamingUrl.toString()} title={title}/>
  );
};

const AudioPlayer = ({ url, title }: { url: string, title: string }) => {
  const playbackState = usePlaybackState();

  useEffect(() => {
    const setupAndPlay = async () => {
      if (!url) return;

      await TrackPlayer.reset();

      await TrackPlayer.add({
        id: 'subsonic-track', 
        url: url,            
        artist: 'Navidrome Stream',
      });
    };

    setupAndPlay();
  }, [url]);
  const togglePlayback = async () => {
    const state = (playbackState as any).state || playbackState; 

    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const renderControl = () => {
    const state = (playbackState as any).state || playbackState;

    if (state === State.Buffering || state === State.Connecting) {
      return <ActivityIndicator size="large" color="#1DB954" />;
    }

    return (
      <TouchableOpacity onPress={togglePlayback}>
        <Text>
          {state === State.Playing ? "⏸ Pause" : "▶ Lecture"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>{title || "Chargement..."}</Text>
      <View>{renderControl()}</View>
    </View>
  );
};

export default Player;
