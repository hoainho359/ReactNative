import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TabItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

type Bai01BottomTabProps = {
  tabs?: ReadonlyArray<TabItem>;
  activeTab?: string;
  onTabPress?: (tabKey: string) => void;
};

export default function Bai01BottomTab({
  tabs,
  activeTab,
  onTabPress,
}: Bai01BottomTabProps) {
  const defaultTabs: TabItem[] = [
    {
      key: "home",
      label: "Trang chủ",
      icon: "home-outline",
      activeIcon: "home",
    },
    {
      key: "category",
      label: "Danh mục",
      icon: "grid-outline",
      activeIcon: "grid",
    },
    {
      key: "cart",
      label: "Giỏ hàng",
      icon: "cart-outline",
      activeIcon: "cart",
    },
    {
      key: "account",
      label: "Tài khoản",
      icon: "person-outline",
      activeIcon: "person",
    },
  ];

  const tabList = tabs ?? defaultTabs;

  return (
    <View style={styles.tabBar}>
      {tabList.map((tab) => {
        const isActive = activeTab
          ? tab.key === activeTab
          : tab.key === defaultTabs[0].key;

        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress?.(tab.key)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? "#1d4ed8" : "#555"}
            />

            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    height: 72,

    flexDirection: "row",
    backgroundColor: "white",

    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  tab: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#e0e7ff",
  },

  label: {
    marginTop: 4,
    fontSize: 12,
  },

  activeLabel: {
    fontWeight: "bold",
  },
});
