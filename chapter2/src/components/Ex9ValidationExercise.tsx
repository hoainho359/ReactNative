import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const MAX_SUMMARY_LENGTH = 150;

export default function ValidationExercise() {
  const [form, setForm] = useState({
    name: "",
    idNumber: "",
    email: "",
    summary: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // 1. Test case: Tên chỉ chứa khoảng trắng
    if (!form.name || form.name.trim().length === 0) {
      newErrors.name =
        "Vui lòng nhập tên của bạn (không được chỉ chứa khoảng trắng).";
    }

    // 2. Test case: Malformed ID (Ví dụ: ID phải là đúng 6 chữ số)
    const idRegex = /^\d{6}$/;
    if (!form.idNumber) {
      newErrors.idNumber = "Vui lòng nhập mã ID.";
    } else if (!idRegex.test(form.idNumber.trim())) {
      newErrors.idNumber = "Mã ID phải bao gồm đúng 6 chữ số (Ví dụ: 123456).";
    }

    // 3. Test case: Email error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Vui lòng nhập địa chỉ email.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email =
        "Email không hợp lệ. Định dạng đúng có dạng name@example.com.";
    }

    // 4. Test case: Overlong summary
    if (form.summary.length > MAX_SUMMARY_LENGTH) {
      const overBy = form.summary.length - MAX_SUMMARY_LENGTH;
      newErrors.summary = `Tóm tắt bị dài hơn ${overBy} ký tự. Vui lòng rút ngắn dưới ${MAX_SUMMARY_LENGTH} ký tự.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("Gửi thông tin thành công!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Bài tập 9 — Validation Copy</Text>

        {/* Name Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Nguyễn Văn A"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* ID Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mã ID (6 chữ số)</Text>
          <TextInput
            style={[styles.input, errors.idNumber && styles.inputError]}
            placeholder="123456"
            keyboardType="numeric"
            maxLength={10}
            value={form.idNumber}
            onChangeText={(text) => setForm({ ...form, idNumber: text })}
          />
          {errors.idNumber && (
            <Text style={styles.errorText}>{errors.idNumber}</Text>
          )}
        </View>

        {/* Email Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@domain.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Summary Field */}
        <View style={styles.fieldGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Mô tả ngắn</Text>
            <Text
              style={[
                styles.counter,
                form.summary.length > MAX_SUMMARY_LENGTH &&
                  styles.counterExceeded,
              ]}
            >
              {form.summary.length}/{MAX_SUMMARY_LENGTH}
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.summary && styles.inputError,
            ]}
            placeholder="Nhập tóm tắt..."
            multiline
            numberOfLines={4}
            value={form.summary}
            onChangeText={(text) => setForm({ ...form, summary: text })}
          />
          {errors.summary && (
            <Text style={styles.errorText}>{errors.summary}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Xác nhận & Gửi</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  counter: {
    fontSize: 12,
    color: "#6B7280",
  },
  counterExceeded: {
    color: "#DC2626",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1F2937",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: "#DC2626",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
