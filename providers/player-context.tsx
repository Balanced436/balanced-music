import { AudioPlayer } from "expo-audio/build/AudioModule.types";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio/build/ExpoAudio";
import { createContext, useContext, useEffect } from "react";

const AudioContext = createContext<AudioPlayer | null>(null);

type AudioProviderProps = {
  children: React.ReactNode;
};
export const AudioProvider = ({ children }: AudioProviderProps) => {
  const player = useAudioPlayer(null, {updateInterval: 1000});

    useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
  }, []);
  return (
    <AudioContext.Provider value={player}>{children}</AudioContext.Provider>
  );
};

export const useGlobalPlayer = () => {
  const player = useContext(AudioContext);
  if (player === undefined) {
    throw new Error("useGlobalPlayer must be used within an AudioProvider");
  }
  return player;
};
