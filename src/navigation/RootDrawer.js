// src/navigation/RootDrawer.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();

export default function RootDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ drawerLabel: 'Main Pages' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerLabel: 'Settings' }}
      />
    </Drawer.Navigator>
  );
}
