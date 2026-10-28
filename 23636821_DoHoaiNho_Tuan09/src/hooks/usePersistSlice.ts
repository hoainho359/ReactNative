import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../store';
import {
  hydrateCart,
  selectCartHydrated,
  selectCartItems,
} from '../store/cartSlice';
import {
  hydrateWishlist,
  selectWishlist,
  selectWishlistHydrated,
} from '../store/wishlistSlice';

// Gọi hook này một lần ở component con nằm bên trong Redux Provider.
export function useAppPersistence(): boolean {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartHydrated = useAppSelector(selectCartHydrated);
  const wishlistItems = useAppSelector(selectWishlist);
  const wishlistHydrated = useAppSelector(selectWishlistHydrated);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      try {
        const [cartRaw, wishlistRaw] = await Promise.all([
          AsyncStorage.getItem('@bookstore/cart'),
          AsyncStorage.getItem('@bookstore/wishlist'),
        ]);
        if (!active) return;
        dispatch(hydrateCart(cartRaw ? JSON.parse(cartRaw) : []));
        dispatch(hydrateWishlist(wishlistRaw ? JSON.parse(wishlistRaw) : []));
      } catch (error) {
        console.warn('Không thể khôi phục dữ liệu đã lưu:', error);
        if (active) {
          dispatch(hydrateCart([]));
          dispatch(hydrateWishlist([]));
        }
      }
    };
    void restore();
    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!cartHydrated) return;
    AsyncStorage.setItem('@bookstore/cart', JSON.stringify(cartItems)).catch(
      (error) => console.warn('Không thể lưu giỏ hàng:', error),
    );
  }, [cartItems, cartHydrated]);

  useEffect(() => {
    if (!wishlistHydrated) return;
    AsyncStorage.setItem(
      '@bookstore/wishlist',
      JSON.stringify(wishlistItems),
    ).catch((error) => console.warn('Không thể lưu yêu thích:', error));
  }, [wishlistItems, wishlistHydrated]);

  return cartHydrated && wishlistHydrated;
}
