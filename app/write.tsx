import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function WritePage() {
  const [entries, setEntries] = useState({
    gratitude: "",
    commitment: "",
    feeling: "",
  });

  const handleSave = () => {
    // TODO: 저장 로직 구현
    router.back();
  };

  const handleTextChange = (field: keyof typeof entries) => (text: string) => {
    const singleLine = text.replace(/\n/g, "");
    setEntries((prev) => ({ ...prev, [field]: singleLine }));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.date}>
            {new Date().toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </Text>
          <Text style={styles.title}>오늘의 마음 기록</Text>
        </View>

        <View style={styles.cardContainer}>
          <LinearGradient
            colors={["#E3F2FD", "#BBDEFB"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardTitle}>감사한 일</Text>
            <TextInput
              style={styles.input}
              placeholder="오늘 감사했던 일을 한 줄로 적어보세요"
              placeholderTextColor="#90CAF9"
              value={entries.gratitude}
              onChangeText={handleTextChange("gratitude")}
            />
          </LinearGradient>

          <LinearGradient
            colors={["#90CAF9", "#64B5F6"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>
              오늘의 다짐
            </Text>
            <TextInput
              style={[styles.input, { color: "#FFFFFF" }]}
              placeholder="오늘 하고 싶은 다짐을 한 줄로 적어보세요"
              placeholderTextColor="#E3F2FD"
              value={entries.commitment}
              onChangeText={handleTextChange("commitment")}
            />
          </LinearGradient>

          <LinearGradient
            colors={["#42A5F5", "#2196F3"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>
              오늘의 느낌
            </Text>
            <TextInput
              style={[styles.input, { color: "#FFFFFF" }]}
              placeholder="오늘 느낀 감정을 한 줄로 적어보세요"
              placeholderTextColor="#E3F2FD"
              value={entries.feeling}
              onChangeText={handleTextChange("feeling")}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  date: {
    fontSize: 16,
    color: "#42A5F5",
    fontFamily: "IBMPlexSansKR_400Regular",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_700Bold",
    marginBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#64B5F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    fontFamily: "IBMPlexSansKR_400Regular",
    color: "#1976D2",
    minHeight: 100,
    textAlignVertical: "top",
    lineHeight: 24,
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
