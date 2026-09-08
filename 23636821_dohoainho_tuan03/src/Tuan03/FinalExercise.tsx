import { ThemeContext } from "@/context/ThemeContext";
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Todo = { id: string; title: string; completed: boolean };

type State = Todo[];
type Action =
  | { type: "ADD_TODO"; payload: { title: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "RESET" };

const initialState: State = [];

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO": {
      const id = Date.now().toString();
      const newTodo: Todo = { id, title: action.payload.title.trim(), completed: false };
      if (!newTodo.title) return state;
      return [newTodo, ...state];
    }
    case "TOGGLE_TODO":
      return state.map((t) => (t.id === action.payload.id ? { ...t, completed: !t.completed } : t));
    case "DELETE_TODO":
      return state.filter((t) => t.id !== action.payload.id);
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const TodoItem = React.memo(
  ({ todo, onToggle, onDelete }: { todo: Todo; onToggle: (id: string) => void; onDelete: (id: string) => void }) => {
    return (
      <TouchableOpacity
        onPress={() => onToggle(todo.id)}
        style={[styles.todoRow, todo.completed && styles.completedRow]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.todoText, todo.completed && styles.completedText]}>{todo.title}</Text>
        </View>
        <View style={styles.todoButtons}>
          <Button title={todo.completed ? "Undo" : "Done"} onPress={() => onToggle(todo.id)} />
          <Button color="#e74c3c" title="Xóa" onPress={() => onDelete(todo.id)} />
        </View>
      </TouchableOpacity>
    );
  },
  (p, n) => p.todo.id === n.todo.id && p.todo.completed === n.todo.completed && p.todo.title === n.todo.title
);

export default function FinalExercise() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    console.log(`Danh sách hiện có ${state.length} công việc`);
  }, [state.length]);

  const addTodo = useCallback(() => {
    if (!input.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập công việc");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: { title: input } });
    setInput("");
  }, [input]);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }, []);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return state;
    return state.filter((t) => t.title.toLowerCase().includes(k));
  }, [state, keyword]);

  const remainingCount = useMemo(() => state.filter((t) => !t.completed).length, [state]);

  const background = themeCtx?.theme === "dark" ? styles.darkBg : styles.lightBg;
  const textColor = themeCtx?.theme === "dark" ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, background]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, textColor]}>Quản lý công việc</Text>
        <View style={styles.themeRow}>
          <Text style={textColor}>{themeCtx?.theme === "dark" ? "Tối" : "Sáng"}</Text>
          <Button title="Đổi giao diện" onPress={() => themeCtx?.toggleTheme()} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, textColor]}
          placeholder="Thêm công việc"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
        />
        <Button title="Thêm" onPress={addTodo} />
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={[styles.input, textColor]}
          placeholder="Tìm kiếm"
          placeholderTextColor="#999"
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button title="Xóa" onPress={() => setKeyword("")} />
      </View>

      <Text style={[styles.counter, textColor]}>{`Còn ${remainingCount} việc chưa hoàn thành`}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
        ListEmptyComponent={<Text style={[styles.empty, textColor]}>Không có công việc</Text>}
        style={styles.list}
      />

      <View style={styles.footer}>
        <Button title="Xóa tất cả" onPress={() => dispatch({ type: "RESET" })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  themeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    color: "#000",
  },
  list: { flex: 1, marginTop: 8 },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 8,
  },
  completedRow: { backgroundColor: "#e0ffe0" },
  todoText: { fontSize: 16 },
  completedText: { textDecorationLine: "line-through", color: "#666" },
  todoButtons: { flexDirection: "row", gap: 8 },
  counter: { marginVertical: 8, fontSize: 14 },
  footer: { paddingVertical: 8 },
  empty: { textAlign: "center", marginTop: 20 },
  lightBg: { backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#111" },
  lightText: { color: "#000" },
  darkText: { color: "#fff" },
});