
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const user = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Xin chào, {user?.name ?? "Khách"}</Text>
      <Text style={styles.mssv}>MSSV: {user?.mssv ?? "Không có"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  name: { fontSize: 20 },
  mssv: { fontSize: 14, marginTop: 8 },
});