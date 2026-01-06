import { NavigationContainer } from '@react-navigation/native';
import RootDrawer from './src/navigation/RootDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <RootDrawer />
    </NavigationContainer>
  );
}
