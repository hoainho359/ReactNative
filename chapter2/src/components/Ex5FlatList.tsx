import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

// Kiểu dữ liệu cho mỗi thông báo
export type Announcement = {
  id: string;
  title: string;
  summary: string;
};

type Props = {
  announcements: Announcement[];
};

export default function AnnouncementFlatList({ announcements }: Props) {
  // renderItem có kiểu TypeScript
  const renderItem: ListRenderItem<Announcement> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </View>
  );

  return (
    <FlatList
      data={announcements}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <Text style={styles.header}>Thông báo mới nhất</Text>
      }
      ListFooterComponent={
        <Text style={styles.footer}>Đã hiển thị hết thông báo</Text>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có thông báo nào</Text>
        </View>
      }
      contentContainerStyle={
        announcements.length === 0 ? styles.emptyContent : styles.content
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  footer: {
    textAlign: "center",
    marginTop: 16,
    color: "#6B7280",
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  summary: {
    color: "#4B5563",
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
  },
});
