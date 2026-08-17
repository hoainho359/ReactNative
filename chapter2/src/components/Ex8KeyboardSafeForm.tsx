import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

export default function KeyboardSafeForm() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput style={styles.input} placeholder="Họ tên" />
        <TextInput style={styles.input} placeholder="MSSV" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Lớp" />
        <TextInput style={styles.input} placeholder="Khoa" />
        <TextInput style={styles.input} placeholder="Địa chỉ" />
        <TextInput style={styles.input} placeholder="Ghi chú" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
