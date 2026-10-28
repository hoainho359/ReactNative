import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';

export default function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const wishlist = useAppSelector(selectWishlist);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.avatar}>📚</Text>
        <Text style={styles.title}>Book App</Text>
        <Text style={styles.subtitle}>Không gian dành cho người yêu sách</Text>
      </View>
      <Pressable style={styles.item} onPress={() => navigation.navigate('Wishlist')}>
        <View style={styles.itemLeft}>
          <Text style={styles.heart}>♥</Text>
          <Text style={styles.itemTitle}>Danh sách yêu thích</Text>
        </View>
        <Text style={styles.count}>{wishlist.length}  ›</Text>
      </Pressable>
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Thông tin ứng dụng</Text>
        <Text style={styles.noteText}>Dữ liệu sách được lấy từ json-server. Giỏ hàng và yêu thích được lưu trên thiết bị.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 16 },
  profile: { alignItems: 'center', paddingVertical: 34 },
  avatar: { fontSize: 48 },
  title: { fontSize: 23, fontWeight: '800', marginTop: 10, color: '#134e4a' },
  subtitle: { color: '#6b7280', marginTop: 5 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heart: { color: '#e53935', fontSize: 22 },
  itemTitle: { fontWeight: '700', fontSize: 15, color: '#202124' },
  count: { color: '#0f766e', fontWeight: '800' },
  note: { marginTop: 18, padding: 16, backgroundColor: '#e6f4f1', borderRadius: 12 },
  noteTitle: { fontWeight: '800', color: '#134e4a' },
  noteText: { marginTop: 6, color: '#3f625e', lineHeight: 21 },
});
