import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: "/",
          }}
        />
        <Tabs.Screen
          name="write"
          options={{
            href: "/write",
          }}
        />
      </Tabs>
    </View>
  );
}
