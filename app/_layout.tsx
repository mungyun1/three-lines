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
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E3F2FD",
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: "#1976D2",
          tabBarInactiveTintColor: "#90CAF9",
          tabBarLabelStyle: {
            fontFamily: "IBMPlexSansKR_500Medium",
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: "/",
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="write"
          options={{
            tabBarLabel: "작성하기",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pencil" size={size} color={color} />
            ),
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            tabBarLabel: "캘린더",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
