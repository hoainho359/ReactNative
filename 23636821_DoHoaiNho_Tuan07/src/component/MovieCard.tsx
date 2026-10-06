import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export type Movie = {
    id: string;
    title: string;
    year: number;
    poster?: string;
};

type MovieCardProps = {
    movie: Movie;
    layout: "row" | "tile";
    onSelect: (id: string) => void;
};

export default function MovieCard({
    movie,
    layout,
    onSelect,
}: MovieCardProps) {
    const isTile = layout === "tile";

    return (
        <Pressable
            style={[
                styles.card,
                isTile
                    ? styles.tileCard
                    : styles.rowCard,
            ]}
            onPress={() => onSelect(movie.id)}
        >
            {movie.poster ? (
                <Image
                    source={{ uri: movie.poster }}
                    style={
                        isTile
                            ? styles.tileImage
                            : styles.rowImage
                    }
                />
            ) : (
                <View
                    style={
                        isTile
                            ? styles.tileImage
                            : styles.rowImage
                    }
                />
            )}

            <View
                style={
                    isTile
                        ? styles.tileContent
                        : styles.rowContent
                }
            >
                <Text
                    style={styles.title}
                    numberOfLines={2}
                >
                    {movie.title}
                </Text>

                <Text style={styles.year}>
                    {movie.year}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,

        // Shadow iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Shadow Android
        elevation: 3,
    },

    // =========================
    // CHẾ ĐỘ 1 CỘT
    // =========================

    rowCard: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },

    rowImage: {
        width: 90,
        height: 120,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },

    rowContent: {
        flex: 1,
        marginLeft: 12,
    },

    // =========================
    // CHẾ ĐỘ 2 CỘT
    // =========================

    tileCard: {
        // Không dùng flex: 1
        // để item cuối khi số lượng lẻ
        // không bị kéo dài toàn chiều ngang
        width: "48%",
        padding: 10,
    },

    tileImage: {
        width: "100%",
        aspectRatio: 0.7,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },

    tileContent: {
        marginTop: 8,
    },

    // =========================
    // TEXT
    // =========================

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },

    year: {
        fontSize: 14,
        color: "#666",
    },
});