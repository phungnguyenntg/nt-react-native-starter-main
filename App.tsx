import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/auth-context';
import RootNavigator from './src/screens/navigator/root-navigator';
import { Provider } from 'react-redux';
import { store } from './src/stores/store';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;