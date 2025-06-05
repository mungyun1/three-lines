import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

type Entry = {
  gratitude: string;
  commitment: string;
  feeling: string;
  date: string;
};

// 임시 데이터
const mockEntries: Entry[] = [
  {
    gratitude: "좋은 날씨에 감사합니다",
    commitment: "오늘은 운동을 열심히 하겠습니다",
    feeling: "상쾌한 아침이에요",
    date: "2024-03-20",
  },
  {
    gratitude: "가족과 함께한 저녁 식사",
    commitment: "독서 시간 가지기",
    feeling: "평온한 하루였습니다",
    date: "2024-03-19",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);

  // 선택된 날짜의 엔트리 찾기
  const findEntry = (selectedDate: Date) => {
    const dateString = selectedDate.toISOString().split("T")[0];
    const entry = mockEntries.find((entry) => entry.date === dateString);
    return entry || null;
  };

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setCurrentEntry(findEntry(selectedDate));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          })}
        </Text>
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      </View>

      <ScrollView style={styles.entriesContainer}>
        {currentEntry ? (
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={["#E3F2FD", "#BBDEFB"]}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardTitle}>감사한 일</Text>
              <Text style={styles.cardText}>{currentEntry.gratitude}</Text>
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
              <Text style={[styles.cardText, { color: "#FFFFFF" }]}>
                {currentEntry.commitment}
              </Text>
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
              <Text style={[styles.cardText, { color: "#FFFFFF" }]}>
                {currentEntry.feeling}
              </Text>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>선택한 날짜의 기록이 없습니다</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E3F2FD",
    backgroundColor: "#FFFFFF",
  },
  monthText: {
    fontSize: 24,
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 10,
  },
  entriesContainer: {
    flex: 1,
  },
  cardContainer: {
    padding: 20,
    gap: 20,
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
    fontSize: 18,
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_400Regular",
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#90CAF9",
    fontFamily: "IBMPlexSansKR_400Regular",
  },
});
