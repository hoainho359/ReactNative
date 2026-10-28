import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { Book } from '../types';
import { formatVND } from '../utils/format';
import FavoriteButton from './FavoriteButton';

type Props = {
  book: Book;
  onPress: (id: string) => void;
};

export default function BookCard({ book, onPress }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 36) / 2;

  return (
    <Pressable style={[styles.card, { width: cardWidth }]} onPress={() => onPress(book.id)}>
      <View>
        <Image source={{ uri: book.cover }} style={[styles.cover, { height: cardWidth * 1.28 }]} />
        <FavoriteButton book={book} />
        {book.stock === 0 && (
          <View style={styles.soldOut}>
            <Text style={styles.soldOutText}>Hết hàng</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
      <Text style={styles.price}>{formatVND(book.price)}</Text>
      <Text style={styles.stock}>{book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Tạm hết hàng'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  cover: { width: '100%', borderRadius: 8, backgroundColor: '#eee' },
  title: { fontSize: 14, fontWeight: '700', marginTop: 8, color: '#202124' },
  author: { fontSize: 12, color: '#6b7280', marginTop: 3 },
  price: { fontSize: 14, fontWeight: '700', color: '#0f766e', marginTop: 6 },
  stock: { fontSize: 11, color: '#6b7280', marginTop: 3, marginBottom: 4 },
  soldOut: {
    // StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldOutText: { color: '#fff', fontWeight: '700' },
});
