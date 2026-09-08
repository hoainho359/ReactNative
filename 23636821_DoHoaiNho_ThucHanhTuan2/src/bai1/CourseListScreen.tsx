import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Course, courses } from "../data/courses";
import CourseRow from "./CourseRow";
import { useState } from "react";

export default function CourseListScreen() {
  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`,
    );
  };
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLocaleLowerCase('vi');

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.instructor} ${course.category}`
      .toLocaleLowerCase('vi')
      .includes(normalizedQuery),
  );
  const ListHeaderComponent = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Course Catalog</Text>
        <Text style={styles.subtitle}>
          Khám phá các khóa học đang mở
        </Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm theo tên, giảng viên hoặc danh mục"
          placeholderTextColor="#8A8F98"
          returnKeyType="search"
          style={styles.searchInput}
        />

        <Text style={styles.resultText}>
          Tìm thấy {filteredCourses.length} khóa học
        </Text>
      </View>
    )
  }
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Không tìm thấy khóa học
        </Text>

        <Text style={styles.emptyText}>
          Hãy thử tìm kiếm bằng một từ khóa khác.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CourseRow
            course={item}
            onPress={openCourse}
          />

        )}
        contentContainerStyle={styles.listContent}
      />
    </View>


  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    color: '#182035',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#697080',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  searchInput: {
    height: 52,
    color: '#182035',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 14,
    paddingHorizontal: 16,

    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E1E5EC',
  },
  courseCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  courseTitle: {
    color: '#182035',
    fontSize: 18,
    fontWeight: '700',
  },
  instructor: {
    color: '#686F7D',
    fontSize: 14,
    marginTop: 7,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  category: {
    overflow: 'hidden',
    color: '#3157A4',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#E8F0FF',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  studentCount: {
    color: '#596171',
    fontSize: 13,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#182035',
    fontSize: 19,
    fontWeight: '700',
  },
  emptyText: {
    color: '#747B88',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
