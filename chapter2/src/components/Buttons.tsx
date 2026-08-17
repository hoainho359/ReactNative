import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

export function PrimaryButton({
  title,
  disabled,
  loading,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed, focused }) => [
        styles.button,
        styles.primary,
        pressed && styles.pressed,
        focused && styles.focused,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.primaryText}>{title}</Text>
      )}
    </Pressable>
  );
}

export function SecondaryButton({
  title,
  disabled,
  loading,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed, focused }) => [
        styles.button,
        styles.secondary,
        pressed && styles.pressed,
        focused && styles.focused,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#2563EB" />
      ) : (
        <Text style={styles.secondaryText}>{title}</Text>
      )}
    </Pressable>
  );
}

type IconButtonProps = {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

export function IconButton({
  icon,
  label,
  disabled,
  loading,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed, focused }) => [
        styles.iconButton,
        pressed && styles.pressed,
        focused && styles.focused,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? <ActivityIndicator color="#2563EB" /> : icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: "#2563EB",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 16,
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  focused: {
    borderWidth: 2,
    borderColor: "#111827",
  },
  disabled: {
    opacity: 0.5,
  },
});
