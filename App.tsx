import { RootNavigator } from '@/navigation/RootNavigator';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';
import { initDB } from '@/storage/sqliteStorage';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        initDB();
        setDbReady(true);
      } catch (err) {
        console.error('DB init failed', err);
      }
    };
    initDb();
  }, []);
  if (!dbReady) {
    return (
      <LoadingOverlay visible={true} />
    );
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;