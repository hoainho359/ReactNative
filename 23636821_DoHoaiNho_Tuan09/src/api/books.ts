import { Platform } from 'react-native';
import type { Book } from '../types';

// Android Emulator: 10.0.2.2; iOS Simulator/Web: localhost.
// Điện thoại thật: thay localhost bằng IPv4 LAN của máy tính.
export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Lỗi HTTP ${response.status} khi gọi ${path}`);
  }
  return (await response.json()) as T;
}

export const fetchBooks = () => request<Book[]>('/books');
export const fetchBookById = (id: string) =>
  request<Book>(`/books/${encodeURIComponent(id)}`);
