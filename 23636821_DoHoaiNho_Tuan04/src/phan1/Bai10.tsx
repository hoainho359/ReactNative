import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function UserProfileDetail() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data: User) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <View style={styles.empty} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile Detail</Text>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.info}>Username: {user?.username}</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>
      <Text style={styles.info}>Phone: {user?.phone}</Text>
      <Text style={styles.info}>Website: {user?.website}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
});
