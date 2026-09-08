import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

function TimerScreen() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.title}>Thời gian: {seconds} giây</Text>
    </View>
  );
}

function ConnectionScreen() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Chưa kết nối');
  const [lastConnected, setLastConnected] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      setLastConnected(new Date().toLocaleString());
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.exampleContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Kết nối giả lập</Text>
        <Switch value={isConnected} onValueChange={setIsConnected} />
      </View>

      <Text style={[styles.message, { color: isConnected ? 'green' : 'red' }]}>
        {message}
      </Text>

      {lastConnected ? (
        <Text style={styles.small}>Lần kết nối gần nhất: {lastConnected}</Text>
      ) : (
        <Text style={styles.small}>Chưa có lần kết nối nào</Text>
      )}
    </View>
  );
}

export default function ConnectionExamples() {
  return (
    <View style={styles.container}>
      <TimerScreen />
      <View style={styles.separator} />
      <ConnectionScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  exampleContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600' },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: { fontSize: 16 },
  message: { fontSize: 18, marginTop: 8 },
  small: { fontSize: 12, marginTop: 6, color: '#666' },
  separator: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 8 },
});
