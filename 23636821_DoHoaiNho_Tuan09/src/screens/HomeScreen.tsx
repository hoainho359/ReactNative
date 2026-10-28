import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchBooks } from '../api/books';
import BookGrid from '../components/BookGrid';
import type { Book } from '../types';
import type { RootStackParamList } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setBooks(await fetchBooks());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    }
  }, []);

  useEffect(() => {
    void load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0f766e" /><Text style={styles.hint}>Đang tải sách...</Text></View>;
  }

  if (error && books.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Không tải được sách</Text>
        <Text style={styles.hint}>{error}</Text>
        <Pressable style={styles.button} onPress={() => { setLoading(true); void load().finally(() => setLoading(false)); }}>
          <Text style={styles.buttonText}>Thử lại</Text>
        </Pressable>
        <Text style={styles.hint}>Hãy chắc chắn json-server đang chạy ở cổng 3000.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Khám phá thế giới sách</Text>
        <Text style={styles.bannerSub}>Chọn cuốn sách tiếp theo của bạn</Text>
      </View>
      {error ? <Text style={styles.errorInline}>{error} · Kéo xuống để thử lại.</Text> : null}
      <BookGrid
        books={books}
        onPressBook={(bookId) => navigation.navigate('BookDetail', { bookId })}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={<Text>Chưa có sách.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  hint: { color: '#6b7280', textAlign: 'center', marginTop: 8 },
  errorTitle: { color: '#b91c1c', fontSize: 18, fontWeight: '700' },
  errorInline: { color: '#b91c1c', paddingHorizontal: 12, paddingTop: 8 },
  button: { backgroundColor: '#0f766e', paddingHorizontal: 20, paddingVertical: 11, borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
  banner: { backgroundColor: '#dff5ef', padding: 18, margin: 12, borderRadius: 14 },
  bannerTitle: { fontSize: 20, fontWeight: '800', color: '#134e4a' },
  bannerSub: { color: '#3f625e', marginTop: 4 },
});
