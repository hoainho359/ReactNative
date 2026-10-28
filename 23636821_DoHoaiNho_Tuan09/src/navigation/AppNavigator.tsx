import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { useAppSelector } from '../store';
import { selectCartCount } from '../store/cartSlice';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '800' },
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Trang chủ', tabBarLabel: 'Trang chủ', headerTitle: 'Book App' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: cartCount || undefined,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: 'Tài khoản', tabBarLabel: 'Tài khoản' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '800' },
        headerTintColor: '#134e4a',
        contentStyle: { backgroundColor: '#f7f8fa' },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Chi tiết sách' }} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Danh sách yêu thích' }} />
    </Stack.Navigator>
  );
}
