import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Bai01BottomTab from "./Bai01BottomTab";
import Bai01HomeScreen from "./Bai01HomeScreen";
import Bai02BookDetail from "./Bai02BookDetail";
import Bai02CartScreen from "./Bai02CartScreen";

const tabs = [
  { key: "home", label: "Trang chủ", icon: "home-outline", activeIcon: "home" },
  {
    key: "category",
    label: "Danh mục",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  { key: "cart", label: "Giỏ hàng", icon: "cart-outline", activeIcon: "cart" },
  {
    key: "account",
    label: "Tài khoản",
    icon: "person-outline",
    activeIcon: "person",
  },
] as const;

export default function Part01IntegratedLayout() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <Bai01HomeScreen />;
      case "category":
        return (
          <SafeAreaView style={styles.placeholderScreen}>
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderTitle}>Danh mục</Text>
              <Text style={styles.placeholderText}>
                Đây là màn hình danh mục demo, dùng để kiểm tra chuyển đổi tab
                cục bộ.
              </Text>
            </View>
          </SafeAreaView>
        );
      case "cart":
        return <Bai02CartScreen />;
      case "account":
        return (
          <SafeAreaView style={styles.placeholderScreen}>
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderTitle}>Tài khoản</Text>
              <Text style={styles.placeholderText}>
                Màn hình tài khoản mẫu cho mục đích kiểm tra layout tổng hợp.
              </Text>
            </View>
          </SafeAreaView>
        );
      default:
        return <Bai02BookDetail />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>{renderScreen()}</View>

      <Bai01BottomTab
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
  },
  placeholderScreen: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  placeholderCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#dfe8ff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
  },
});
