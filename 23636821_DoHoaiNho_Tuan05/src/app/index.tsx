import { StyleSheet, View } from "react-native";
import Part01IntegratedLayout from "../components/Part01IntegratedLayout";

export default function App() {
  return (
    <View style={styles.container}>
      <Part01IntegratedLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
