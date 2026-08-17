import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

type Announcement = {
  id: string;
  title: string;
};

type Props = {
  today: Announcement[];
  thisWeek: Announcement[];
  earlier: Announcement[];
};

export default function AnnouncementSectionList({
  today,
  thisWeek,
  earlier,
}: Props) {
  const sections = [
    { title: "Hôm nay", data: today },
    { title: "Tuần này", data: thisWeek },
    { title: "Trước đó", data: earlier },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{section.title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
  },
  itemText: {
    fontSize: 15,
    color: "#111827",
  },
});
