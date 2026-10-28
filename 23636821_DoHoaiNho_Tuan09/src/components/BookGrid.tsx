import React from 'react';
import { FlatList, type ListRenderItem, View } from 'react-native';
import type { Book } from '../types';
import BookCard from './BookCard';

type Props = {
  books: Book[];
  onPressBook: (id: string) => void;
  ListEmptyComponent?: React.ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function BookGrid({
  books,
  onPressBook,
  ListEmptyComponent,
  refreshing = false,
  onRefresh,
}: Props) {
  const renderItem: ListRenderItem<Book> = ({ item }) => (
    <BookCard book={item} onPress={onPressBook} />
  );

  return (
    <FlatList
      data={books}
      keyExtractor={(book) => book.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
      contentContainerStyle={[
        { padding: 12, paddingBottom: 24 },
        books.length === 0 && { flexGrow: 1 },
      ]}
      ListEmptyComponent={ListEmptyComponent ?? <View />}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
