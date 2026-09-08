
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Product = { id: string; name: string; price: number };

const PRODUCTS: Product[] = [
  { id: "1", name: "Áo thun", price: 200000 },
  { id: "2", name: "Quần jean", price: 450000 },
  { id: "3", name: "Giày thể thao", price: 800000 },
  { id: "4", name: "Nón", price: 120000 },
];

function useRenderCount(label: string) {
  const ref = useRef(0);
  ref.current += 1;
  // for quick debugging/compare renders
  // console.log(`${label} render:`, ref.current);
  return ref.current;
}

const ProductItem = React.memo(
  ({ product, onPress }: { product: Product; onPress: (p: Product) => void }) => {
    const renders = useRenderCount(`ProductItem ${product.id}`);
    return (
      <TouchableOpacity
        onPress={() => onPress(product)}
        style={styles.item}
        activeOpacity={0.7}
      >
        <View style={styles.row}>
          <Text style={styles.name}>
            {product.name} ({product.price.toLocaleString("vi-VN")}đ)
          </Text>
          <Text style={styles.renderCount}>#{renders}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prev, next) =>
    prev.product.id === next.product.id &&
    prev.product.price === next.product.price &&
    prev.product.name === next.product.name &&
    prev.onPress === next.onPress
);

export default function SearchAndCaculateSumProduct() {
  const [keyword, setKeyword] = useState<string>("");
  const [maxPriceText, setMaxPriceText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const maxPrice = useMemo(() => {
    const n = Number(maxPriceText.replace(/\D/g, ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [maxPriceText]);

  const filteredProducts = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(k));
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);
    if (sortOrder === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [keyword, maxPrice, sortOrder]);

  const totalPrice = useMemo(
    () => filteredProducts.reduce((s, p) => s + p.price, 0),
    [filteredProducts]
  );

  const handleSelect = useCallback((product: Product) => {
    console.log("Đã chọn:", product.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tìm sản phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên sản phẩm"
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.filterRow}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Giá tối đa (VNĐ)"
          value={maxPriceText}
          onChangeText={setMaxPriceText}
          keyboardType="numeric"
        />
        <View style={styles.sortButtons}>
          <Button
            title="Giá ↑"
            onPress={() => setSortOrder((s) => (s === "asc" ? "none" : "asc"))}
            color={sortOrder === "asc" ? "#2e86de" : undefined}
          />
          <Button
            title="Giá ↓"
            onPress={() => setSortOrder((s) => (s === "desc" ? "none" : "desc"))}
            color={sortOrder === "desc" ? "#2e86de" : undefined}
          />
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <ProductItem product={item} onPress={handleSelect} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Không có sản phẩm</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>
          Tổng giá: {totalPrice.toLocaleString("vi-VN")}đ
        </Text>
        <View style={styles.footerButtons}>
          <Button title="Xóa tìm kiếm" onPress={() => setKeyword("")} />
          <Button title="Xóa bộ lọc" onPress={() => { setMaxPriceText(""); setSortOrder("none"); }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  smallInput: { flex: 1, marginRight: 8 },
  filterRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  sortButtons: { flexDirection: "row", gap: 8 },
  list: { flex: 1, marginBottom: 12 },
  item: {
    padding: 12,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginBottom: 8,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 16 },
  price: { fontSize: 14, color: "#333" },
  renderCount: { fontSize: 12, color: "#888", marginLeft: 8 },
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
  footer: { borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 12 },
  total: { fontSize: 18, marginBottom: 8 },
  footerButtons: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
});
