import React from "react";
import { StyleSheet, Text, View } from "react-native";

const courses = [
  "React Native",
  "Spring Boot",
  "Microservices",
  "Database",
  "Cloud Computing",
  "AI Fundamentals",
];

export default function CourseGrid() {
  return (
    <View style={styles.grid}>
      {courses.map((course) => (
        <View key={course} style={styles.card}>
          <Text style={styles.title}>{course}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 16,
  },

  card: {
    flexBasis: 150,
    minWidth: 140,
    maxWidth: 260,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});
