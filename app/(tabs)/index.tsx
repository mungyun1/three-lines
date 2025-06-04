import { Link, router, Stack } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          navigationBarHidden: true,
        }}
      />
      <View style={styles.container}>
        <AnimatedThemedText
          entering={FadeInDown.duration(800).delay(800)}
          type="title"
          style={styles.title}
        >
          하루 3줄로 시작하는{"\n"}마음 정리
        </AnimatedThemedText>
        <AnimatedThemedText
          entering={FadeInDown.duration(800).delay(1000)}
          style={styles.subtitle}
        >
          매일 3줄의 글로{"\n"}나의 감정을 정리하고{"\n"}마음을 돌아보세요
        </AnimatedThemedText>

        <Link href="/write" asChild>
          <Pressable>
            <AnimatedThemedView
              entering={FadeInUp.duration(800).delay(1200)}
              style={styles.writeButtonContainer}
            >
              <ThemedView style={styles.writeButton}>
                <ThemedText
                  style={styles.writeButtonText}
                  onPress={() => {
                    router.push("/write");
                  }}
                >
                  오늘의 3줄 작성하기
                </ThemedText>
              </ThemedView>
            </AnimatedThemedView>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heroImageContainer: {
    width: "100%",
    height: SCREEN_WIDTH * 0.6,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  heroText: {
    position: "absolute",
    left: 24,
    top: SCREEN_WIDTH * 0.1,
    color: "white",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 52,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "left",
    lineHeight: 42,
    marginTop: 40,
    marginHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
    opacity: 0.6,
    marginTop: 12,
    marginHorizontal: 24,
  },
  writeButtonContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: "auto",
    marginBottom: 40,
  },
  writeButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  writeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
