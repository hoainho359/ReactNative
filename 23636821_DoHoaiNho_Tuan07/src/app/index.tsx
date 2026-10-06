import MovieCard, { Movie } from "@/component/MovieCard";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
} from "react-native-safe-area-context";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    // Trạng thái pull to refresh
    const [refreshing, setRefreshing] = useState(false);

    // true = 2 cột, false = 1 cột
    const [isTile, setIsTile] = useState(false);

    // Hàm gọi API GET lấy danh sách phim
    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(
                "https://6ac474aa54a61668c5f59e34.mockapi.io/api/v1/Moviews"
            );

            if (!res.ok) {
                throw new Error("Không thể gọi API");
            }

            const data: Movie[] = await res.json();

            setMovies(data);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            Alert.alert(
                "Lỗi",
                "Không thể tải danh sách phim."
            );
        }
    }, []);

    // Load dữ liệu lần đầu
    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        };

        loadMovies();
    }, [fetchData]);

    // Pull to Refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        await fetchData();

        setRefreshing(false);
    }, [fetchData]);

    const handleSelect = (id: string) => {
        const movie = movies.find((item) => item.id === id);

        if (movie) {
            Alert.alert(
                "Movie",
                `${movie.title} (${movie.year})`
            );
        }
    };

    // Số cột phụ thuộc vào Switch
    const numColumns = isTile ? 2 : 1;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Movie App
                    </Text>

                    <View style={styles.switchContainer}>
                        <Text>Dạng lưới</Text>

                        <Switch
                            value={isTile}
                            onValueChange={setIsTile}
                        />
                    </View>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#007AFF"
                        />
                    </View>
                ) : (
                    <FlatList
                        // Bắt buộc đổi key khi thay đổi số cột
                        key={String(numColumns)}

                        data={movies}

                        // Câu 5b
                        numColumns={numColumns}

                        keyExtractor={(item) => item.id}

                        renderItem={({ item }) => (
                            <MovieCard
                                movie={item}
                                layout={
                                    isTile
                                        ? "tile"
                                        : "row"
                                }
                                onSelect={handleSelect}
                            />
                        )}

                        contentContainerStyle={styles.list}

                        // Khoảng cách giữa 2 cột
                        columnWrapperStyle={
                            isTile
                                ? styles.columnWrapper
                                : undefined
                        }

                        // Câu 6: Pull to Refresh
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={["#007AFF"]}
                                tintColor="#007AFF"
                            />
                        }
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
    },

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    list: {
        padding: 16,
    },

    // Khoảng cách giữa 2 cột
    columnWrapper: {
        justifyContent: "space-between",
    },
});