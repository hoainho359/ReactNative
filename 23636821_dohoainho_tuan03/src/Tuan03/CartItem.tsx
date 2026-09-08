
import { useReducer } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = { id: number; name: string; quantity: number };
type State = { items: Item[]; selectedId: number | null };
type Action =
  | { type: 'SELECT'; id: number | null }
  | { type: 'ADD' }
  | { type: 'REMOVE' }
  | { type: 'RESET_ITEM' }
  | { type: 'RESET_ALL' };

const initialState: State = {
  items: [
    { id: 1, name: 'Sản phẩm A', quantity: 0 },
    { id: 2, name: 'Sản phẩm B', quantity: 0 },
    { id: 3, name: 'Sản phẩm C', quantity: 0 },
  ],
  selectedId: null,
};

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT':
      return { ...state, selectedId: action.id };
    case 'ADD': {
      if (state.selectedId == null) return state;
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === state.selectedId ? { ...it, quantity: it.quantity + 1 } : it
        ),
      };
    }
    case 'REMOVE': {
      if (state.selectedId == null) return state;
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === state.selectedId ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it
        ),
      };
    }
    case 'RESET_ITEM': {
      if (state.selectedId == null) return state;
      return {
        ...state,
        items: state.items.map((it) => (it.id === state.selectedId ? { ...it, quantity: 0 } : it)),
      };
    }
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

export default function CartScreen() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const selected = state.items.find((i) => i.id === state.selectedId) ?? null;
  const total = state.items.reduce((s, it) => s + it.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tổng sản phẩm: {total}</Text>

      <FlatList
        data={state.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === state.selectedId;
          return (
            <TouchableOpacity
              style={[styles.itemRow, isSelected && styles.itemSelected]}
              onPress={() => dispatch({ type: 'SELECT', id: isSelected ? null : item.id })}
            >
              <Text style={styles.itemText}>
                {item.name} — Số lượng: {item.quantity}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={{ width: '100%', marginBottom: 12 }}
      />

      <View style={styles.buttons}>
        <Button title="Thêm" onPress={() => dispatch({ type: 'ADD' })} disabled={!selected} />
        <Button title="Bớt" onPress={() => dispatch({ type: 'REMOVE' })} disabled={!selected} />
        <Button title="Xóa mục" onPress={() => dispatch({ type: 'RESET_ITEM' })} disabled={!selected} />
        <Button title="Xóa giỏ hàng" onPress={() => dispatch({ type: 'RESET_ALL' })} />
      </View>

      <Text style={styles.hint}>
        {selected ? `Đang chỉnh: ${selected.name}` : 'Chọn một sản phẩm để thao tác'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  itemRow: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  itemSelected: {
    backgroundColor: '#d0f0c0',
  },
  itemText: {
    fontSize: 16,
  },
  buttons: {
    gap: 8,
    width: '100%',
    justifyContent: 'space-between',
    height: 160,
  },
  hint: {
    marginTop: 8,
    textAlign: 'center',
    color: '#555',
  },
});
