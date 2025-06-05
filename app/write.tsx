import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Mood = "happy" | "calm" | "neutral" | "sad" | "angry" | null;
type MoodIcon =
  | "emoticon-excited-outline"
  | "emoticon-happy-outline"
  | "emoticon-neutral-outline"
  | "emoticon-sad-outline"
  | "emoticon-angry-outline";

interface MoodType {
  id: Mood;
  icon: MoodIcon;
  label: string;
  color: string;
  activeColor: string;
}

export default function WritePage() {
  const [entries, setEntries] = useState({
    gratitude: "",
    commitment: "",
    feeling: "",
    mood: null as Mood,
  });

  const moods: MoodType[] = [
    {
      id: "angry",
      icon: "emoticon-angry-outline",
      label: "화남",
      color: "#FFCDD2",
      activeColor: "#FF5252",
    },
    {
      id: "sad",
      icon: "emoticon-sad-outline",
      label: "슬픔",
      color: "#C5CAE9",
      activeColor: "#7986CB",
    },
    {
      id: "neutral",
      icon: "emoticon-neutral-outline",
      label: "보통",
      color: "#B0BEC5",
      activeColor: "#78909C",
    },
    {
      id: "calm",
      icon: "emoticon-happy-outline",
      label: "평온",
      color: "#B2DFDB",
      activeColor: "#4DB6AC",
    },
    {
      id: "happy",
      icon: "emoticon-excited-outline",
      label: "행복",
      color: "#FFE082",
      activeColor: "#FFB300",
    },
  ];

  const handleTextChange = (field: keyof typeof entries) => (text: string) => {
    setEntries((prev) => ({ ...prev, [field]: text }));
  };

  const handleMoodSelect = (mood: Mood) => {
    setEntries((prev) => ({ ...prev, mood }));
  };

  const isFormValid = () => {
    return (
      entries.gratitude.trim() !== "" &&
      entries.commitment.trim() !== "" &&
      entries.feeling.trim() !== "" &&
      entries.mood !== null
    );
  };

  const handleSave = () => {
    if (!isFormValid()) return;
    // TODO: 저장 로직 구현
    console.log("저장된 데이터:", entries);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Text style={styles.date}>
            📅{" "}
            {new Date().toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </Text>
          <Text style={styles.title}>오늘의 기록✏️</Text>
        </View>

        <View style={styles.moodSelector}>
          <Text style={styles.moodTitle}>오늘 하루는 어땠나요?</Text>
          <View style={styles.moodButtons}>
            {moods.map((mood) => (
              <Pressable
                key={mood.id}
                style={[
                  styles.moodButton,
                  entries.mood === mood.id && styles.moodButtonSelected,
                ]}
                onPress={() => handleMoodSelect(mood.id)}
              >
                <View
                  style={[
                    styles.moodIconContainer,
                    { backgroundColor: mood.color + "20" },
                    entries.mood === mood.id && {
                      backgroundColor: mood.activeColor + "20",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={mood.icon}
                    size={24}
                    color={
                      entries.mood === mood.id ? mood.activeColor : mood.color
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.moodLabel,
                    { color: mood.color },
                    entries.mood === mood.id && { color: mood.activeColor },
                  ]}
                >
                  {mood.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📚오늘의 경험</Text>
            <TextInput
              style={styles.input}
              placeholder="오늘의 경험을 한 줄로!"
              placeholderTextColor="#BDBDBD"
              value={entries.gratitude}
              onChangeText={handleTextChange("gratitude")}
              multiline={true}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>❤️‍🔥오늘의 다짐</Text>
            <TextInput
              style={styles.input}
              placeholder="오늘의 다짐을 한 줄로!"
              placeholderTextColor="#BDBDBD"
              value={entries.commitment}
              onChangeText={handleTextChange("commitment")}
              multiline={true}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>❕오늘의 느낌</Text>
            <TextInput
              style={styles.input}
              placeholder="오늘의 감정을 한 줄로!"
              placeholderTextColor="#BDBDBD"
              value={entries.feeling}
              onChangeText={handleTextChange("feeling")}
              multiline={true}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Pressable
          style={[
            styles.saveButton,
            !isFormValid() && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isFormValid()}
        >
          <Text
            style={[
              styles.saveButtonText,
              !isFormValid() && styles.saveButtonTextDisabled,
            ]}
          >
            저장하기
          </Text>
        </Pressable>
      </View>
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
    color: "#616161",
    fontFamily: "IBMPlexSansKR_500Medium",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: "#212121",
    fontFamily: "IBMPlexSansKR_700Bold",
    marginBottom: 20,
  },
  moodSelector: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  moodTitle: {
    fontSize: 18,
    color: "#212121",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    marginBottom: 16,
  },
  moodButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodButton: {
    alignItems: "center",
    gap: 6,
  },
  moodIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  moodButtonSelected: {
    transform: [{ scale: 1.05 }],
  },
  moodLabel: {
    fontSize: 12,
    fontFamily: "IBMPlexSansKR_500Medium",
  },
  cardContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: "#212121",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    marginBottom: 15,
  },
  input: {
    fontSize: 15,
    fontFamily: "IBMPlexSansKR_400Regular",
    color: "#212121",
    minHeight: 100,
    textAlignVertical: "top",
    lineHeight: 24,
    padding: 10,
    borderWidth: 0,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
  },
  scrollViewContent: {
    paddingBottom: 60, // 저장 버튼 높이만큼 여백 추가
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  saveButton: {
    backgroundColor: "#212121",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "IBMPlexSansKR_600SemiBold",
  },
  saveButtonTextDisabled: {
    color: "#9E9E9E",
  },
});
