import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Header from "./Header";
import InfoRow from "./InfoRow";

const Profile = () => {
  const [textValue, setTextValue] = useState("");

  // Đang thực hiện lưu hồ sơ
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Nút lưu có bị vô hiệu hóa hay không
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    >
      <View>
        <Header />
      </View>

      <View style={styles.infoContainer}>
        <InfoRow
          name="Đỗ Hoài Nhớ"
          mssv="23636821"
          uriImage={require("../assets/images/react-logo.png")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nhập thông tin:</Text>

        <TextInput
          style={styles.textInput}
          value={textValue}
          onChangeText={setTextValue}
          placeholder="Nhập họ tên..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.studentInfo}>
        <Text style={styles.studentTitle}>Thông tin sinh viên</Text>

        <Text style={styles.studentText}>Email: hoainhodo952@gmail.com</Text>

        <Text style={styles.studentText}>Lớp: DHKTPM19A</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={isDisabled || isSubmitting}
          android_ripple={{
            color: "rgba(255,255,255,0.2)",
          }}
          onPress={() => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              alert("Đã lưu hồ sơ!");
            }, 1000);
          }}
          style={({ pressed }) => [
            styles.button,

            // Khi đang nhấn
            pressed && styles.buttonPressed,

            // Khi disabled hoặc đang submit
            (isDisabled || isSubmitting) && styles.buttonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Lưu hồ sơ sinh viên"
          accessibilityState={{
            disabled: isDisabled || isSubmitting,
            busy: isSubmitting,
          }}
          hitSlop={5}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,

                // Text cũng phản hồi khi nhấn
                pressed && styles.buttonTextPressed,
              ]}
            >
              {isSubmitting ? "ĐANG LƯU HỒ SƠ..." : "LƯU HỒ SƠ"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setIsDisabled((current) => !current);
          }}
          style={({ pressed }) => [
            styles.secondaryButton,

            // Trạng thái đang nhấn
            pressed && styles.secondaryButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isDisabled ? "Bật lại nút lưu hồ sơ" : "Vô hiệu hóa nút lưu hồ sơ"
          }
          accessibilityState={{
            disabled: false,
            selected: isDisabled,
          }}
          hitSlop={5}
        >
          {({ pressed }) => (
            <Text
              style={[styles.buttonText, pressed && styles.buttonTextPressed]}
            >
              {isDisabled ? "BẬT LẠI NÚT LƯU" : "VÔ HIỆU HÓA NÚT LƯU"}
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingBottom: 30,
  },

  infoContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  // txt
  section: {
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },

  //info

  studentInfo: {
    width: "90%",
    alignSelf: "center",

    backgroundColor: "#b2d3f7",

    borderColor: "#117eeb",
    borderWidth: 1,
    borderRadius: 20,

    padding: 20,

    marginBottom: 20,
  },

  studentTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  studentText: {
    fontSize: 15,
    color: "gray",
    marginBottom: 8,
  },

  // =========================
  // BUTTON CONTAINER
  // =========================

  buttonContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },

  // btn1

  button: {
    minHeight: 48,
    minWidth: 48,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#007AFF",

    borderRadius: 8,

    paddingVertical: 12,
    paddingHorizontal: 16,

    marginBottom: 12,

    // Trạng thái bình thường
    elevation: 3,
  },

  // =========================
  // BUTTON 1 - PRESSED
  // =========================

  buttonPressed: {
    backgroundColor: "#0056b3",

    // Không chỉ thay đổi màu
    opacity: 0.8,

    // Thu nhỏ một chút để người dùng
    // nhìn thấy đang nhấn
    transform: [{ scale: 0.96 }],

    // Bỏ shadow khi đang nhấn
    elevation: 0,
  },

  // =========================
  // BUTTON 1 - DISABLED
  // =========================

  buttonDisabled: {
    backgroundColor: "#cccccc",

    opacity: 0.5,

    // Trở về kích thước bình thường
    transform: [{ scale: 1 }],

    elevation: 0,
  },

  // =========================
  // BUTTON 2
  // =========================

  secondaryButton: {
    minHeight: 48,
    minWidth: 48,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#34C759",

    borderRadius: 8,

    paddingVertical: 12,
    paddingHorizontal: 16,

    elevation: 3,
  },

  // =========================
  // BUTTON 2 - PRESSED
  // =========================

  secondaryButtonPressed: {
    backgroundColor: "#228b3f",

    opacity: 0.8,

    transform: [{ scale: 0.96 }],

    elevation: 0,
  },

  // =========================
  // BUTTON TEXT
  // =========================

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  buttonTextPressed: {
    color: "#e0e0e0",
  },
});

export default Profile;
