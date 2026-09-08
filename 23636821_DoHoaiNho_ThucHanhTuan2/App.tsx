import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CourseListScreen from './src/bai1/CourseListScreen';
import StudentDirectoryScreen from './src/partA/StudentDirectoryScreen';

export default function App() {
  return (
    <View>
      <CourseListScreen />
      {/* <StudentDirectoryScreen /> */}
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
