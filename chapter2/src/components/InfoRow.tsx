import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface InfoRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

export default function InfoRow({
  label,
  value,
  emphasized = false,
}: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={[styles.value, emphasized && styles.emphasizedValue]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginRight: 12,
  },

  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    paddingVertical: 16,
    color: "#111827",
  },

  emphasizedValue: {
    fontWeight: "700",
    color: "#2563EB",
  },
});
