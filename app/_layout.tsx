import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import { store } from "../state/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  TrackPlayer.setupPlayer()
  

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack></Stack>
      </ThemeProvider>
    </Provider>
  );
}
