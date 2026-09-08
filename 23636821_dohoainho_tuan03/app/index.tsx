import FinalExercise from "@/Tuan03/FinalExercise";
import { ThemeProvider } from "@/context/ThemeContext";
import { View } from "react-native";

export default function App() {
  return (
    <ThemeProvider >
    {/* <UserProvider> */}
      <View style={{ flex: 1 }}>
        {/* <ProfileScreen /> */}
        {/* <CartScreen /> */}
        {/* <LoginScreen />  */}
        {/* <ProductScreen /> */}
        {/* <SearchAndCaculateSumProduct /> */}
        <FinalExercise />
       
      </View>
    {/* </UserProvider> */}
    </ThemeProvider>
  );
}