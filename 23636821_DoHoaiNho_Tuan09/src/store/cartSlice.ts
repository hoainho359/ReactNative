import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book, CartItem } from '../types';
import type { RootState } from './index';

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

const initialState: CartState = { items: [], hydrated: false };
const clamp = (quantity: number, stock: number) =>
  Math.max(1, Math.min(quantity, stock));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const book = action.payload;
      if (book.stock <= 0) return;
      const item = state.items.find((entry) => entry.book.id === book.id);
      if (item) {
        item.book = book;
        item.quantity = clamp(item.quantity + 1, book.stock);
      } else {
        state.items.push({ book, quantity: 1 });
      }
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (entry) => entry.book.id === action.payload.id,
      );
      if (item && item.book.stock > 0) {
        item.quantity = clamp(action.payload.quantity, item.book.stock);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.book.id !== action.payload,
      );
    },
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
        .filter((item) => item?.book && item.book.stock > 0)
        .map((item) => ({
          ...item,
          quantity: clamp(Number(item.quantity) || 1, item.book.stock),
        }));
      state.hydrated = true;
    },
  },
});

export const { addToCart, setQuantity, removeFromCart, hydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartHydrated = (state: RootState) => state.cart.hydrated;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );
export const selectQuantityInCart = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.book.id === id)?.quantity ?? 0;
