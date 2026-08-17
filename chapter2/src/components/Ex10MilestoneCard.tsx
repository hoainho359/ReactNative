import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MilestoneCard() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    // Fix 4 (Order problems): Dùng accessible={true} và accessibilityLabel để đọc trọn vẹn cả Card
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`Cot moc: Thiet ke UI. Trang thai: ${
        isCompleted ? "Da xong" : "Chua xong"
      }`}
    >
      <View style={styles.header}>
        {/* Fix 2 (Wrong roles): Khai báo role header cho tiêu đề */}
        <Text style={styles.title} accessibilityRole="header">
          Cot moc 1: Thiet ke UI
        </Text>

        {/* Fix 1 (Missing names) & Fix 5 (Small targets): Thêm accessibilityLabel và hitSlop tăng vùng bấm */}
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => {}}
          accessibilityLabel="Xem chi tiet cot moc"
          accessibilityRole="button"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.infoText}>Info</Text>
        </TouchableOpacity>
      </View>

      {/* Fix 6 (Contrast failures) & Fix 7 (Clipped text): Dùng minHeight và màu chữ đậm chuẩn WCAG */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Mo ta: Xay dung he thong giao dien bao gom Button va Input dat chuan
          WCAG.
        </Text>
      </View>

      {/* Fix 2 (Wrong roles) & Fix 3 (Absent states): Khai báo role checkbox và trạng thái accessibilityState */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setIsCompleted(!isCompleted)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isCompleted }}
        accessibilityLabel="Danh dau hoan thanh cot moc"
      >
        <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
          {isCompleted && <Text style={styles.checkmarkText}>X</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Da hoan thanh cot moc nay</Text>
      </TouchableOpacity>

      {/* Fix 3 (Absent states): Khai báo trạng thái disabled cho trình đọc màn hình */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={() => setIsSubmitting(true)}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityState={{ disabled: isSubmitting }}
        accessibilityLabel={isSubmitting ? "Dang xu ly" : "Cap nhat tien do"}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Dang xu ly..." : "Cap nhat tien do"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827", // Fix 6: Màu chữ tối đảm bảo độ tương phản
  },
  infoButton: {
    minWidth: 44, // Fix 5: Đảm bảo kích thước tối thiểu 44x44
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#1F2937",
  },
  descriptionBox: {
    minHeight: 40, // Fix 7: Dùng minHeight thay vì height cố định để không bị mất chữ khi phóng to
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#374151", // Fix 6: Màu chữ đạt tỷ lệ tương phản
    lineHeight: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    minHeight: 44, // Fix 5: Vùng bấm đạt tiêu chuẩn
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    minHeight: 44, // Fix 5: Đảm bảo chiều cao nút bấm
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
