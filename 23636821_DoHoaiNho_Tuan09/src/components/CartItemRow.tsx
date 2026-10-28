import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';

type Props = {
  item: CartItem;
  quantity: number;
  onChangeQuantity: (id: string, quantity: number) => void;
  onRemove: (item: CartItem) => void;
};

export default React.memo(function CartItemRow({
  item,
  quantity,
  onChangeQuantity,
  onRemove,
}: Props) {
  const { book } = item;
  const canDecrease = quantity > 1;
  const canIncrease = quantity < book.stock;

  return (
    <View style={styles.row}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.price}>{formatVND(book.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable
            disabled={!canDecrease}
            style={[styles.qtyButton, !canDecrease && styles.disabled]}
            onPress={() => onChangeQuantity(book.id, quantity - 1)}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable
            disabled={!canIncrease}
            style={[styles.qtyButton, !canIncrease && styles.disabled]}
            onPress={() => onChangeQuantity(book.id, quantity + 1)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Kho: {book.stock}</Text>
        </View>
        <Text style={styles.subtotal}>Thành tiền: {formatVND(book.price * quantity)}</Text>
      </View>
      <Pressable onPress={() => onRemove(item)} hitSlop={8} style={styles.remove}>
        <Text style={styles.removeText}>✕</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    gap: 10,
  },
  cover: { width: 76, height: 108, borderRadius: 7, backgroundColor: '#eee' },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '700', color: '#202124' },
  price: { marginTop: 5, color: '#0f766e', fontWeight: '700' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  qtyButton: {
    width: 30, height: 30, borderRadius: 7, backgroundColor: '#e6f4f1',
    alignItems: 'center', justifyContent: 'center',
  },
  disabled: { backgroundColor: '#eeeeee', opacity: 0.55 },
  qtyButtonText: { fontSize: 20, fontWeight: '700', color: '#134e4a' },
  qty: { minWidth: 16, textAlign: 'center', fontWeight: '700' },
  stock: { fontSize: 11, color: '#6b7280' },
  subtotal: { fontSize: 12, marginTop: 7, color: '#374151' },
  remove: { paddingHorizontal: 3, paddingTop: 2 },
  removeText: { color: '#dc2626', fontSize: 17, fontWeight: '700' },
});
