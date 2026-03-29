import { Playlist } from "@/app/library";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio/build/ExpoAudio";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`;
  }

  return `${m}:${pad(s)}`;
};

interface AudioPlayerProps {
  playlist: Playlist;
  songIndex?: number;
}

/**
 * Audio player component managing a playlist
 * * @component
 * @param {AudioPlayerProps} props - Component properties.
 * @param {Playlist} props.playlist - The playlist object containing the title and song array.
 * @param {number} [props.songIndex=0] - The starting index of the song to be played.
 */
const AudioPlayer = ({ playlist, songIndex = 0 }: AudioPlayerProps) => {
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const [currentIdx, setCurrentIdx] = useState(songIndex);

  useEffect(() => {
    const song = playlist.songs[currentIdx];
    if (song) {
      player.replace(song.streamingUrl);
      player.play();
    }
  }, [currentIdx, player]);

  const playNext = () => {
    if (currentIdx < playlist.songs.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const playPrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };
  useEffect(() => {
    if (status.didJustFinish) {
      playNext();
    }
  }, [status.didJustFinish]);

  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  return (
    <View style={{ padding: 10, flexDirection: "column", height: "100%"}}>
      <Text style={{color: "gray", alignSelf: "center", paddingBottom: 10 }}>{playlist.title}</Text>
      <View style={{ backgroundColor: "gray", flex: 1 }}></View>
      <View style={{ paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <IconButton
            icon="repeat"
            selected={player.loop}
            onPress={(e) => (player.loop = !player.loop)}
          ></IconButton>

          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="skip-previous"
              onPress={() => {
                playPrevious();
              }}
            />

            {status.playing ? (
              <IconButton icon="pause" onPress={() => player.pause()} />
            ) : (
              <IconButton icon="play" onPress={() => player.play()} />
            )}

            <IconButton icon="skip-next" onPress={() => playNext()} />
          </View>
          <IconButton icon="shuffle"></IconButton>
        </View>

        <View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {playlist.songs[currentIdx].title}
            </Text>
            <Text style={{ color: "gray" }}>
              {playlist.songs[currentIdx].album}
            </Text>
          </View>

          <ProgressBar progress={progress} color="#007AFF" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              {formatTime(status.currentTime)}
            </Text>
            <Text style={{ fontSize: 12 }}>{formatTime(status.duration)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
