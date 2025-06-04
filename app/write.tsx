import { StyleSheet, Text, View } from "react-native";

export default function WritePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 3줄 작성하기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#556270",
    marginTop: 40,
  },
});
