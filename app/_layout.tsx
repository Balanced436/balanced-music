import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import AudioPlayer from "@/components/ui/audio-player";
import { AudioProvider } from "@/providers/player-context";
import { Provider } from "react-redux";
import { store } from "../state/store";
import {MiniAudioPlayer} from "@/components/ui/mini-audio-player";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // https://github.com/callstack/react-native-paper/issues/3880 put contexts on top of paperprovider
  return (
    <Provider store={store}>
      <AudioProvider>
        <PaperProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack></Stack>
            <MiniAudioPlayer/>
            <AudioPlayer/>
          </ThemeProvider>
        </PaperProvider>
      </AudioProvider>
    </Provider>
  );
}
