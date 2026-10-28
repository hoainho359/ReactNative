import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchBookById } from '../api/books';
import FavoriteButton from '../components/FavoriteButton';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/cartSlice';
import { formatVND } from '../utils/format';
import type { Book } from '../types';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route }: Props) {
  const { bookId } = route.params;
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchBookById(bookId)
      .then((data) => { if (active) setBook(data); })
      .catch((err) => { if (active) setError(err instanceof Error ? err.message : 'Không tải được sách'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [bookId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#0f766e" /><Text>Đang tải chi tiết...</Text></View>;
  if (error || !book) return <View style={styles.center}><Text>{error ?? 'Không tìm thấy sách.'}</Text></View>;

  const handleAdd = () => {
    if (book.stock <= 0) {
      Alert.alert('Hết hàng', 'Sách này hiện không còn tồn kho.');
      return;
    }
    dispatch(addToCart(book));
    Alert.alert('Thành công', `Đã thêm "${book.title}" vào giỏ hàng.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <FavoriteButton book={book} size={24} style={{ top: 12, right: 12 }} />
      </View>
      <Text style={styles.category}>{book.category} · ★ {book.rating.toFixed(1)}</Text>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Tác giả: {book.author}</Text>
      <Text style={styles.price}>{formatVND(book.price)}</Text>
      <Text style={styles.stock}>{book.stock > 0 ? `Còn ${book.stock} cuốn trong kho` : 'Tạm hết hàng'}</Text>
      <Text style={styles.sectionTitle}>Giới thiệu</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Pressable disabled={book.stock <= 0} style={[styles.button, book.stock <= 0 && styles.buttonDisabled]} onPress={handleAdd}>
        <Text style={styles.buttonText}>{book.stock > 0 ? '＋  Thêm vào giỏ hàng' : 'Hết hàng'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  content: { padding: 16, paddingBottom: 30 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  coverWrap: { alignSelf: 'center', width: '72%', position: 'relative' },
  cover: { width: '100%', aspectRatio: 2 / 3, borderRadius: 14, backgroundColor: '#eee' },
  category: { color: '#0f766e', fontWeight: '700', marginTop: 18 },
  title: { fontSize: 25, fontWeight: '800', color: '#202124', marginTop: 8 },
  author: { color: '#6b7280', marginTop: 8 },
  price: { color: '#0f766e', fontSize: 23, fontWeight: '800', marginTop: 14 },
  stock: { marginTop: 6, color: '#4b5563' },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginTop: 22, marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 23, color: '#4b5563' },
  button: { backgroundColor: '#0f766e', padding: 15, borderRadius: 11, alignItems: 'center', marginTop: 24 },
  buttonDisabled: { backgroundColor: '#9ca3af' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
