import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: 240, backgroundColor: '#fff' },
          drawerActiveTintColor: '#000',
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            drawerIcon: ({color}) => <Ionicons name="home-outline" size={22} color={color} /> 
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}