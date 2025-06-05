import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

type Entry = {
  gratitude: string;
  commitment: string;
  feeling: string;
  date: string;
  mood: string;
};

type MoodIconName =
  | "emoticon"
  | "emoticon-neutral"
  | "emoticon-neutral-outline"
  | "emoticon-sad"
  | "emoticon-angry";

// 기분에 따른 이모지와 색상 매핑
const moodConfig: Record<
  string,
  { icon: MoodIconName; color: string; activeColor: string }
> = {
  happy: {
    icon: "emoticon",
    color: "#FFD700",
    activeColor: "#FFA500",
  },
  calm: {
    icon: "emoticon-neutral",
    color: "#90EE90",
    activeColor: "#32CD32",
  },
  neutral: {
    icon: "emoticon-neutral-outline",
    color: "#A9A9A9",
    activeColor: "#696969",
  },
  sad: {
    icon: "emoticon-sad",
    color: "#87CEEB",
    activeColor: "#4169E1",
  },
  angry: {
    icon: "emoticon-angry",
    color: "#FF6B6B",
    activeColor: "#DC143C",
  },
};

// 임시 데이터
const mockEntries: Entry[] = [
  {
    gratitude: "좋은 날씨에 감사합니다",
    commitment: "오늘은 운동을 열심히 하겠습니다",
    feeling: "상쾌한 아침이에요",
    date: "2024-03-20",
    mood: "happy",
  },
  {
    gratitude: "가족과 함께한 저녁 식사",
    commitment: "독서 시간 가지기",
    feeling: "평온한 하루였습니다",
    date: "2024-03-19",
    mood: "calm",
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  const { width } = useWindowDimensions();
  const minDaySize = 30; // 최소 날짜 크기
  const maxDaySize = 45; // 최대 날짜 크기
  const calculatedDaySize = Math.max(
    minDaySize,
    Math.min(maxDaySize, width / 9)
  );
  const daySize = calculatedDaySize;
  const iconSize = daySize * 0.8;

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    setCurrentEntry(findEntry(date.dateString));
  };

  const handleMonthChange = (date: any) => {
    setCurrentDate(new Date(date.timestamp));
  };

  const moveMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    handleMonthChange({ timestamp: newDate.getTime() });
  };

  const findEntry = (date: string) => {
    return mockEntries.find((entry) => entry.date === date) || null;
  };

  const renderCustomDayComponent = ({ date, state }: any) => {
    if (!date) return null;

    const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
    const dateString = `${date.year}-${String(date.month).padStart(
      2,
      "0"
    )}-${String(date.day).padStart(2, "0")}`;
    const entry = mockEntries.find((entry) => entry.date === dateString);

    return (
      <View
        style={[
          styles.dayContainer,
          {
            width: daySize,
            height: daySize,
            padding: daySize * 0.1,
          },
          state === "disabled" && styles.disabledDay,
        ]}
      >
        {entry ? (
          <View style={[styles.moodContainer, { padding: daySize * 0.1 }]}>
            <MaterialCommunityIcons
              name={moodConfig[entry.mood as keyof typeof moodConfig].icon}
              size={iconSize}
              color={moodConfig[entry.mood as keyof typeof moodConfig].color}
            />
            <Text
              style={[
                styles.dayTextOnMood,
                {
                  fontSize: Math.max(10, daySize * 0.3),
                  transform: [
                    { translateX: -daySize * 0.15 },
                    { translateY: -daySize * 0.15 },
                  ],
                },
                state === "disabled" && styles.disabledDayText,
                dayOfWeek === 0 && styles.sundayText,
                dayOfWeek === 6 && styles.saturdayText,
              ]}
            >
              {date.day}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.emptyDayContainer,
              {
                width: daySize * 0.85,
                height: daySize * 0.85,
                padding: daySize * 0.1,
              },
            ]}
          >
            <Text
              style={[
                styles.dayText,
                { fontSize: Math.max(10, daySize * 0.35) },
                state === "disabled" && styles.disabledDayText,
                dayOfWeek === 0 && styles.sundayText,
                dayOfWeek === 6 && styles.saturdayText,
              ]}
            >
              {date.day}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={[
          styles.calendar,
          {
            width: "100%",
          },
        ]}
        current={currentDate.toISOString().split("T")[0]}
        onDayPress={handleDateSelect}
        onMonthChange={handleMonthChange}
        initialDate={currentDate.toISOString().split("T")[0]}
        markingType="custom"
        markedDates={mockEntries.reduce((acc, entry) => {
          const mood = moodConfig[entry.mood as keyof typeof moodConfig];
          acc[entry.date] = {
            customStyles: {
              container: {
                backgroundColor: mood.color,
                borderRadius: 20,
              },
              text: {
                color: "#FFFFFF",
              },
            },
          };
          return acc;
        }, {} as any)}
        theme={{
          calendarBackground: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          textSectionTitleColor: "#1976D2",
          selectedDayBackgroundColor: "#1976D2",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#1976D2",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#1976D2",
          selectedDotColor: "#FFFFFF",
          arrowColor: "transparent",
          monthTextColor: "transparent",
          indicatorColor: "#1976D2",
          textDayFontFamily: "IBMPlexSansKR_400Regular",
          textMonthFontFamily: "IBMPlexSansKR_600SemiBold",
          textDayHeaderFontFamily: "IBMPlexSansKR_500Medium",
          textDayStyle: {
            width: daySize,
            textAlign: "center",
            marginTop: 2,
            fontSize: Math.max(10, daySize * 0.35),
          },
          stylesheet: {
            calendar: {
              main: {
                container: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
              },
            },
          },
        }}
        hideArrows={true}
        hideDayNames={true}
        enableSwipeMonths={true}
        renderHeader={(date) => {
          if (!date) return null;
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleContainer}>
                <Pressable
                  onPress={() => moveMonth("prev")}
                  style={({ pressed }) => [
                    styles.arrowButton,
                    styles.arrowButtonLeft,
                    {
                      width: daySize,
                      height: daySize,
                      padding: daySize * 0.1,
                    },
                    pressed && styles.arrowButtonPressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={Math.max(15, daySize * 0.6)}
                    color="#1976D2"
                  />
                </Pressable>
                <Text
                  style={[
                    styles.headerTitle,
                    { fontSize: Math.max(16, daySize * 0.5) },
                  ]}
                >{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</Text>
                <Pressable
                  onPress={() => moveMonth("next")}
                  style={({ pressed }) => [
                    styles.arrowButton,
                    styles.arrowButtonRight,
                    {
                      width: daySize,
                      height: daySize,
                      padding: daySize * 0.1,
                    },
                    pressed && styles.arrowButtonPressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={Math.max(15, daySize * 0.6)}
                    color="#1976D2"
                  />
                </Pressable>
              </View>
              <View style={styles.weekDayRow}>
                {["일", "월", "화", "수", "목", "금", "토"].map(
                  (day, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.weekDayText,
                        {
                          fontSize: Math.max(12, daySize * 0.4),
                          width: daySize,
                          padding: daySize * 0.1,
                        },
                        index === 0 && styles.sundayText,
                        index === 6 && styles.saturdayText,
                      ]}
                    >
                      {day}
                    </Text>
                  )
                )}
              </View>
            </View>
          );
        }}
        dayComponent={renderCustomDayComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  calendar: {
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  headerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 0,
    position: "relative",
  },
  headerTitle: {
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_600SemiBold",
    textAlign: "center",
  },
  arrowButton: {
    borderRadius: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  arrowButtonLeft: {
    left: 0,
  },
  arrowButtonRight: {
    right: 0,
  },
  arrowButtonPressed: {
    backgroundColor: "rgba(25, 118, 210, 0.1)",
  },
  weekDayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  weekDayText: {
    color: "#1976D2",
    fontFamily: "IBMPlexSansKR_500Medium",
    textAlign: "center",
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  moodContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDayContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontFamily: "IBMPlexSansKR_400Regular",
    color: "#2d4150",
    textAlign: "center",
  },
  dayTextOnMood: {
    position: "absolute",
    fontFamily: "IBMPlexSansKR_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
    top: "50%",
    left: "50%",
  },
  sundayText: {
    color: "#FF0000",
  },
  saturdayText: {
    color: "#0000FF",
  },
  disabledDay: {
    opacity: 0.4,
  },
  disabledDayText: {
    color: "#d9e1e8",
  },
});
