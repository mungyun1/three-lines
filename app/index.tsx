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

export default function MainPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const [isLogoAnimationDone, setIsLogoAnimationDone] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLogoAnimationDone(true);
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handlePress = () => {
    router.push("/write");
  };

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
            <LinearGradient
              colors={["#FF6B6B", "#4ECDC4"]}
              style={[styles.line, { width: "60%" }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <LinearGradient
              colors={["#FFE66D", "#4ECDC4"]}
              style={[styles.line, { width: "80%" }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <LinearGradient
              colors={["#4ECDC4", "#556270"]}
              style={styles.line}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={styles.brandName}>THREE LINES</Text>
          <Text style={styles.tagline}>Simple. Elegant. Powerful.</Text>
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
            <Pressable onPress={handlePress}>
              <LinearGradient
                colors={["#4ECDC4", "#556270"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>오늘의 3줄 작성하기</Text>
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
    backgroundColor: "#fff",
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
    height: 160,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  line: {
    height: 40,
    borderRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brandName: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: "bold",
    color: "#556270",
    letterSpacing: 4,
  },
  tagline: {
    marginTop: 10,
    fontSize: 16,
    color: "#4ECDC4",
    letterSpacing: 2,
  },
  buttonContainer: {
    width: "80%",
    position: "absolute",
    bottom: 100,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
