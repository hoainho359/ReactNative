import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Student } from '../data/students';

interface StudentRowProps {
    student: Student;
    onPress: (student: Student) => void;
}

function getInitials(fullName: string) {
    const words = fullName.trim().split(/\s+/);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export default function StudentRow({
    student,
    onPress,
}: StudentRowProps) {
    const isActive = student.status === 'Đang học';

    return (
        <Pressable
            onPress={() => onPress(student)}
            style={({ pressed }) => [
                styles.studentCard,
                pressed && styles.studentCardPressed,
            ]}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {getInitials(student.fullName)}
                </Text>
            </View>

            <View style={styles.studentContent}>
                <Text style={styles.studentName}>
                    {student.fullName}
                </Text>

                <Text style={styles.studentMeta}>
                    {student.studentId} · {student.className}
                </Text>
            </View>

            <View
                style={[
                    styles.statusBadge,
                    isActive
                        ? styles.activeBadge
                        : styles.pausedBadge,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        isActive
                            ? styles.activeText
                            : styles.pausedText,
                    ]}
                >
                    {student.status}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E1E5EC',
    },

    studentCardPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.99 }],
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8F0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        color: '#3157A4',
        fontSize: 15,
        fontWeight: '800',
    },

    studentContent: {
        flex: 1,
        marginLeft: 12,
    },

    studentName: {
        color: '#182035',
        fontSize: 16,
        fontWeight: '700',
    },

    studentMeta: {
        color: '#686F7D',
        fontSize: 13,
        marginTop: 5,
    },

    statusBadge: {
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 5,
    },

    activeBadge: {
        backgroundColor: '#E6F7ED',
    },

    pausedBadge: {
        backgroundColor: '#FFF1E8',
    },

    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },

    activeText: {
        color: '#16834B',
    },

    pausedText: {
        color: '#C5682C',
    },
});
