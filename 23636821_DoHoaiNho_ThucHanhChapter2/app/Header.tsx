import { Text, View } from "react-native";

const Header = () => {
  return (
    <View style={{ width: "100%", backgroundColor: "blue", height: 100 }}>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          paddingLeft: 20,
          paddingTop: 20,
        }}
      >
        Smart Campus
      </Text>
    </View>
  );
};

export default Header;
