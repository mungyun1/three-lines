import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";

export default function MainPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const [isLogoAnimationDone, setIsLogoAnimationDone] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLogoAnimationDone(true);
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = () => {
    router.push("/write");
  };

  const renderPencilIcon = () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 21.5L5 20l1-1 4-4 11-11c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0l-11 11-4 4-1 1-1.5 1.5c-.2.2-.2.5 0 .7.2.1.5.1.7 0z"
        stroke="#8B7355"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.5 5.5l4 4"
        stroke="#8B7355"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.linesContainer}>
            <View style={styles.lineWrapper}>
              <LinearGradient
                colors={["#E3F2FD", "#BBDEFB"]}
                style={[styles.line, { width: "70%" }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <View style={styles.lineWrapper}>
              <LinearGradient
                colors={["#90CAF9", "#64B5F6"]}
                style={[styles.line, { width: "85%" }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <View style={styles.lineWrapper}>
              <LinearGradient
                colors={["#42A5F5", "#2196F3"]}
                style={styles.line}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </View>
          <View style={styles.brandContainer}>
            {renderPencilIcon()}
            <Text style={styles.brandName}>Three Lines</Text>
          </View>
          <Text style={styles.tagline}>하루 세 줄, 마음을 적다</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonFadeAnim,
              transform: [
                {
                  translateY: buttonFadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {isLogoAnimationDone && (
            <Pressable
              onPress={handlePress}
              style={({ pressed }) => [
                styles.buttonWrapper,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={["#1E88E5", "#1976D2"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>마음 기록하기</Text>
              </LinearGradient>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  linesContainer: {
    width: width * 0.8,
    height: 150,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  lineWrapper: {
    width: "100%",
    transform: [{ rotate: "-2deg" }],
  },
  line: {
    height: 35,
    borderRadius: 17.5,
    width: "100%",
    shadowColor: "#64B5F6",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    gap: 8,
  },
  brandName: {
    fontSize: 38,
    fontFamily: "IBMPlexSansKR_700Bold",
    color: "#1976D2",
    letterSpacing: 0.5,
  },
  tagline: {
    marginTop: 12,
    fontSize: 17,
    fontFamily: "IBMPlexSansKR_300Light",
    color: "#42A5F5",
    letterSpacing: 3,
  },
  buttonContainer: {
    width: "80%",
    position: "absolute",
    bottom: 100,
  },
  buttonWrapper: {
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  button: {
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1976D2",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "IBMPlexSansKR_600SemiBold",
    letterSpacing: 1,
  },
});
