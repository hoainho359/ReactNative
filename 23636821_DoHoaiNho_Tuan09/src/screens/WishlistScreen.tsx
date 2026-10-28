import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookGrid from '../components/BookGrid';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

export default function WishlistScreen({ navigation }: Props) {
  const wishlist = useAppSelector(selectWishlist);
  const empty = (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>♡</Text>
      <Text style={styles.emptyTitle}>Chưa có sách yêu thích</Text>
      <Text style={styles.emptyHint}>Bấm vào trái tim trên thẻ sách để lưu lại.</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
        <Text style={styles.buttonText}>Khám phá sách</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <BookGrid
        books={wishlist}
        onPressBook={(id) => navigation.navigate('BookDetail', { bookId: id })}
        ListEmptyComponent={empty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyIcon: { fontSize: 48, color: '#e53935' },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginTop: 12, color: '#202124' },
  emptyHint: { textAlign: 'center', color: '#6b7280', marginTop: 6 },
  button: { marginTop: 18, backgroundColor: '#0f766e', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 9 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
