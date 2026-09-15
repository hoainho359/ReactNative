import UserProfileDetail from "@/phan1/Bai10";
import { fetchWrongApi, type CustomError } from "@/phan2/ApiError";
import { filterByName } from "@/phan2/Filter";
import {
  fetchPaginatedProducts,
  fetchProducts,
  type ApiResponse,
  type Product,
} from "@/phan2/ProductSearch";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Tab = "part1" | "part2";

type DemoItem = {
  id: number;
  name: string;
  price: number;
};

const sampleItems: DemoItem[] = [
  { id: 1, name: "iPhone 15", price: 2000 },
  { id: 2, name: "Laptop Dell", price: 1500 },
  { id: 3, name: "AirPods Pro", price: 500 },
  { id: 4, name: "Samsung Galaxy", price: 1800 },
];

function Part1Demo() {
  return <View>
      {/* News Feed
      <NewsFeed /> */}
    User Profile Detail
    <UserProfileDetail />
  </View>
}

function Part2Demo() {
  const [keyword, setKeyword] = useState("phone");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadPage = async (nextPage: number, isRefresh = false) => {
    setLoading(true);
    setSearchError(null);

    try {
      const result: ApiResponse<Product> = await fetchPaginatedProducts(nextPage, 3);
      const nextProducts = isRefresh ? result.data : [...products, ...result.data];

      setProducts(nextProducts);
      setPage(result.page);
      setTotal(result.total);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Không thể tải sản phẩm";
      setSearchError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPage(1, true);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setSearchError(null);

    try {
      const result = await fetchProducts(keyword.trim() || "phone", 5);
      setProducts(result.products);
      setTotal(result.total);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể tải sản phẩm";
      setSearchError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleWrongApi = async () => {
    try {
      await fetchWrongApi();
      Alert.alert("Thành công", "API đã trả về dữ liệu");
    } catch (error) {
      const customError = toCustomError(error);
      Alert.alert("Lỗi API", customError.message);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPage(1, true);
  };

  const handleLoadMore = () => {
    if (products.length >= total || loading) return;
    loadPage(page + 1, false);
  };

  const filteredItems = filterByName(sampleItems, filterText);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Bài 11: Product Search</Text>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa sản phẩm"
        style={styles.input}
      />
      <Button title={loading ? "Đang tìm..." : "Tìm sản phẩm"} onPress={handleSearch} />

      {searchError ? <Text style={styles.error}>{searchError}</Text> : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Giá: ${item.price}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        style={styles.list}
      />

      <Text style={styles.sectionTitle}>Bài 12: API Error Handling</Text>
      <Button title="Gọi API sai URL" onPress={handleWrongApi} />

      <Text style={styles.sectionTitle}>Bài 13: Filtered List Generic</Text>
      <TextInput
        value={filterText}
        onChangeText={setFilterText}
        placeholder="Lọc theo tên..."
        style={styles.input}
      />

      {filteredItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text>Giá: ${item.price}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Bài 14: Pagination Response</Text>
      <Text>Trang hiện tại: {page} / {Math.ceil(total / 3) || 1}</Text>

      <Text style={styles.sectionTitle}>Bài 15: Pull to Refresh State</Text>
      <Text>refreshing: {refreshing ? "true" : "false"}</Text>
    </ScrollView>
  );
}

function toCustomError(error: unknown): CustomError {
  if (typeof error === "object" && error !== null && "message" in error) {
    const candidate = error as Partial<CustomError>;
    return {
      message: typeof candidate.message === "string" ? candidate.message : "Lỗi không xác định",
      statusCode: typeof candidate.statusCode === "number" ? candidate.statusCode : undefined,
    };
  }

  return {
    message: "Lỗi không xác định",
  };
}

export default function App() {
  const [tab, setTab] = useState<Tab>("part1");

  return (
    <View style={styles.root}>
      <View style={styles.tabBar}>
        <Button title="Phần 1" onPress={() => setTab("part1")} />
        <Button title="Phần 2" onPress={() => setTab("part2")} />
      </View>

      {tab === "part1" ? <Part1Demo /> : <Part2Demo />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    flex: 1,
    marginTop: 12,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: 8,
  },
});