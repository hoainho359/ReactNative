import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Course } from "../data/courses";
import { useState } from "react";

interface CourseRowProps {
    course: Course;
    onPress: (course: Course) => void;
}

export default function CourseRow({ course, onPress }: CourseRowProps) {
    return (
        <View>
            <Pressable
                onPress={() => onPress(course)}
                style={({ pressed }) => [
                    styles.courseCard,
                    pressed && styles.courseCardPressed,
                ]}
            >
                <Text style={styles.courseTitle}>
                    {course.title}
                </Text>

                <Text style={styles.instructor}>
                    Giảng viên: {course.instructor}
                </Text>

                <View style={styles.courseFooter}>
                    <Text style={styles.category}>
                        {course.category}
                    </Text>

                    <Text style={styles.studentCount}>
                        {course.students} sinh viên
                    </Text>
                </View>
            </Pressable>

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
        minHeight: 52,
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
