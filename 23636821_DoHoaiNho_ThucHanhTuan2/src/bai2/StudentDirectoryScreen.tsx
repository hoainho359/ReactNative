import { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Student,
  studentSections,
} from '../data/students';

import StudentRow from './StudentRow';

export default function StudentDirectoryScreen() {
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase('vi');

    if (!normalizedQuery) {
      return studentSections;
    }

    return studentSections
      .map((section) => ({
        ...section,
        data: section.data.filter((student) =>
          `${student.fullName} ${student.studentId} ${student.className}`
            .toLocaleLowerCase('vi')
            .includes(normalizedQuery),
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [query]);

  const totalStudents = filteredSections.reduce(
    (total, section) => total + section.data.length,
    0,
  );

  const openStudent = (student: Student) => {
    Alert.alert(
      student.fullName,
      `Mã sinh viên: ${student.studentId}
Lớp: ${student.className}
Trạng thái: ${student.status}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <StudentRow
            student={item}
            onPress={openStudent}
          />
        )}

        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {section.title}
            </Text>
          </View>
        )}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>
              Student Directory
            </Text>

            <Text style={styles.subtitle}>
              Danh bạ sinh viên theo khoa
            </Text>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm tên, mã sinh viên hoặc lớp"
              placeholderTextColor="#8A8F98"
              returnKeyType="search"
              autoCorrect={false}
              style={styles.searchInput}
            />

            <Text style={styles.resultText}>
              Tìm thấy {totalStudents} sinh viên
            </Text>
          </View>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Không tìm thấy sinh viên
            </Text>

            <Text style={styles.emptyText}>
              Không có sinh viên phù hợp với
              {' "'}
              {query.trim()}
              {'"'}.
            </Text>
          </View>
        }

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}

        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}

        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
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
    paddingBottom: 30,
  },

  header: {
    marginBottom: 16,
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
  },

  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },

  sectionHeader: {
    backgroundColor: '#F4F6FA',
    paddingVertical: 10,
  },

  sectionTitle: {
    color: '#3157A4',
    fontSize: 17,
    fontWeight: '800',
  },

  separator: {
    height: 10,
  },

  sectionSeparator: {
    height: 14,
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
