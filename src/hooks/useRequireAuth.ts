import { useAuth } from '../contexts/auth-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../screens/navigator/root-navigator';

type RootStackNav = NativeStackNavigationProp<RootStackParamList>;

export const useRequireAuth = () => {
  const { user } = useAuth();
  const navigation = useNavigation<RootStackNav>();

  const requireAuth = (redirectTo?: keyof MainTabParamList) => {
    if (!user) {
      navigation.navigate('Login', { redirectTo });
      return false;
    }
    return true;
  };

  return requireAuth;
};