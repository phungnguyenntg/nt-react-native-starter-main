import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/screens/navigator/main-navigator';
import SignInScreen from './src/screens/signin-screen';

function App() {
  return (
    <SafeAreaProvider>
      {/* <MainNavigator /> */}
      <SignInScreen />
    </SafeAreaProvider>
  );
}

export default App;