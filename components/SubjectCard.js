import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SubjectCard({list,click}) {
  const {date, subjectTitle,description } = list.item
  return (
    <TouchableOpacity style={styles.card} onPress={()=>click(list)}>
      <Text style={styles.title}>{subjectTitle}</Text>

      <View style={styles.row}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111111", // dark background, not white
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Mono-space",
    fontSize: 20,
    letterSpacing:5,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#888888",
    flexShrink: 1,
    marginRight: 12,
  },
  date: {
    fontSize: 13,
    color: "#888888",
  },
});
