export function formatVND(amount: number): string {
  return `${Math.round(amount).toLocaleString('vi-VN')} đ`;
}
