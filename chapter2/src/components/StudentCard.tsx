import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoRow from "./InfoRow";

interface StudentCardProps {
  studentId: string;
  major: string;
  name: string;
  academicYear: string;
}

export default function StudentCard({
  studentId,
  name,
  major,
  academicYear,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Student Profile</Text>

      <InfoRow label="Mã SV" value={studentId} emphasized />
      <InfoRow label="Họ tên" value={name} />
      <InfoRow label="Ngành học" value={major} />

      <InfoRow label="Niên khóa" value={academicYear} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 260,
    marginTop: 32,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",

    // viền
    borderWidth: 1,
    borderColor: "#E5E7EB",

    // đổ bóng iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    // đổ bóng Android
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
    textAlign: "center",
  },
});
