import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  name: string;
  teacher: string;
  localImage?: ImageSourcePropType;
  remoteImage?: string;
};

export default function Ex3({ name, teacher, localImage, remoteImage }: Props) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <View style={styles.card}>
      {/* Local image */}
      {localImage ? (
        <Image
          source={localImage}
          style={styles.image}
          accessibilityLabel={`Ảnh môn ${name}`}
        />
      ) : remoteImage && !failed ? (
        <View>
          {/* Remote image */}
          <Image
            source={{ uri: remoteImage }}
            style={styles.image}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setFailed(true);
            }}
            accessibilityLabel={`Ảnh môn ${name}`}
          />

          {/* Loading */}
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator />
              <Text>Đang tải ảnh...</Text>
            </View>
          )}
        </View>
      ) : (
        /* Failed image */
        <View style={[styles.image, styles.fallback]}>
          <Text>Không tải được ảnh</Text>
        </View>
      )}

      <View style={styles.content}>
        {/* Informative text */}
        <Text style={styles.title}>{name}</Text>
        <Text>Giảng viên: {teacher}</Text>

        {/* Decorative image */}
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.decorative}
          accessible={false}
        />

        {/* Task does not depend on image */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Xem chi tiết</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 180,
  },
  loading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  decorative: {
    width: 24,
    height: 24,
    opacity: 0.3,
  },
  button: {
    marginTop: 8,
    minHeight: 44,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
