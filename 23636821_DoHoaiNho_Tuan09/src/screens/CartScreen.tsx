import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CartItemRow from '../components/CartItemRow';
import { useDebouncedQuantities } from '../hooks/useDebouncedQuantities';
import { useAppDispatch, useAppSelector } from '../store';
import {
  removeFromCart,
  selectCartItems,
} from '../store/cartSlice';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';

type Coupon = {
  code: string;
  label: string;
  apply: (subtotal: number) => number;
};

const COUPONS: Record<string, Coupon> = {
  SALE10: {
    code: 'SALE10',
    label: 'Giảm 10%',
    apply: (subtotal) => Math.round(subtotal * 0.1),
  },
  BOOK50K: {
    code: 'BOOK50K',
    label: 'Giảm 50.000 đ (đơn từ 200.000 đ)',
    apply: (subtotal) => (subtotal >= 200000 ? 50000 : 0),
  },
};

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const { drafts, changeQuantity, discard } = useDebouncedQuantities(300);
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const quantityOf = useCallback(
    (item: CartItem) => drafts[item.book.id] ?? item.quantity,
    [drafts],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.book.price * quantityOf(item), 0),
    [items, quantityOf],
  );
  const discount = coupon ? Math.min(coupon.apply(subtotal), subtotal) : 0;
  const total = subtotal - discount;

  const confirmRemove = useCallback((item: CartItem) => {
    Alert.alert('Xoá sản phẩm', `Bỏ "${item.book.title}" khỏi giỏ hàng?`, [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => {
          discard(item.book.id);
          dispatch(removeFromCart(item.book.id));
        },
      },
    ]);
  }, [dispatch, discard]);

  const applyCoupon = () => {
    const found = COUPONS[couponInput.trim().toUpperCase()];
    if (!found) {
      setCoupon(null);
      Alert.alert('Mã không hợp lệ', 'Hãy thử SALE10 hoặc BOOK50K.');
      return;
    }
    setCoupon(found);
    Alert.alert('Áp dụng thành công', `Đã áp dụng mã ${found.code}.`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.book.id}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            quantity={quantityOf(item)}
            onChangeQuantity={changeQuantity}
            onRemove={confirmRemove}
          />
        )}
        contentContainerStyle={[styles.list, items.length === 0 && styles.emptyList]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
            <Text style={styles.emptyHint}>Hãy chọn một cuốn sách bạn yêu thích ở Trang chủ.</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <View style={styles.couponRow}>
          <TextInput
            style={styles.couponInput}
            placeholder="Mã giảm giá (SALE10)"
            autoCapitalize="characters"
            value={couponInput}
            onChangeText={setCouponInput}
          />
          <Pressable style={styles.couponButton} onPress={applyCoupon}>
            <Text style={styles.couponButtonText}>Áp dụng</Text>
          </Pressable>
        </View>
        {coupon && (
          <Pressable onPress={() => { setCoupon(null); setCouponInput(''); }}>
            <Text style={styles.couponApplied}>✓ {coupon.code}: {coupon.label} (bấm để bỏ)</Text>
          </Pressable>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tạm tính</Text>
          <Text style={styles.summaryValue}>{formatVND(subtotal)}</Text>
        </View>
        {discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={styles.discount}>− {formatVND(discount)}</Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{formatVND(total)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  list: { padding: 12, paddingBottom: 8 },
  emptyList: { flexGrow: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28 },
  emptyIcon: { fontSize: 42 },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginTop: 12, color: '#202124' },
  emptyHint: { color: '#6b7280', textAlign: 'center', marginTop: 6, lineHeight: 21 },
  footer: { padding: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  couponRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  couponInput: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#111827' },
  couponButton: { backgroundColor: '#134e4a', borderRadius: 8, paddingHorizontal: 14, justifyContent: 'center' },
  couponButtonText: { color: '#fff', fontWeight: '700' },
  couponApplied: { color: '#0f766e', fontSize: 12, marginBottom: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 },
  summaryLabel: { color: '#4b5563' },
  summaryValue: { color: '#374151', fontWeight: '600' },
  discount: { color: '#0f766e', fontWeight: '700' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 10, marginTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#111827' },
  totalValue: { fontSize: 19, fontWeight: '800', color: '#0f766e' },
});
