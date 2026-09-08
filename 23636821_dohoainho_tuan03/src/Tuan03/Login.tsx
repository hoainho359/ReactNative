
import { useReducer } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type State = {
  email: string;
  password: string;
  error: string;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  email: "",
  password: "",
  error: "",
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload, error: "" };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function LoginScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({ type: "SET_ERROR", payload: "Vui lòng nhập đầy đủ thông tin" });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: "" });
    // tiếp tục logic đăng nhập ở đây
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
        placeholder="Mật khẩu"
        secureTextEntry
      />

      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

      <View style={styles.buttons}>
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Button title="Đặt lại" onPress={() => dispatch({ type: "RESET" })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  label: { marginTop: 8, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  error: { color: "red", textAlign: "center", marginVertical: 8 },
  buttons: { marginTop: 12, gap: 8 },
});
