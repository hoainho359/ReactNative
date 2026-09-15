export function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string
): T[] {
  return items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}
