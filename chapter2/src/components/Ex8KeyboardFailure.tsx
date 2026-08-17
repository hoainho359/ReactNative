import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Ex8eyboardFailure() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Họ tên" />
      <TextInput style={styles.input} placeholder="MSSV" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Lớp" />
      <TextInput style={styles.input} placeholder="Khoa" />
      <TextInput style={styles.input} placeholder="Địa chỉ" />
      <TextInput style={styles.input} placeholder="Ghi chú" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
