import {
  IBMPlexSansKR_100Thin,
  IBMPlexSansKR_200ExtraLight,
  IBMPlexSansKR_300Light,
  IBMPlexSansKR_400Regular,
  IBMPlexSansKR_500Medium,
  IBMPlexSansKR_600SemiBold,
  IBMPlexSansKR_700Bold,
  useFonts,
} from "@expo-google-fonts/ibm-plex-sans-kr";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    IBMPlexSansKR_100Thin,
    IBMPlexSansKR_200ExtraLight,
    IBMPlexSansKR_300Light,
    IBMPlexSansKR_400Regular,
    IBMPlexSansKR_500Medium,
    IBMPlexSansKR_600SemiBold,
    IBMPlexSansKR_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}
