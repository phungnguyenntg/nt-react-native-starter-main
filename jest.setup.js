import { getToken } from '@/storage/secureStorage';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props) => <>{props.children}</>,
  };
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('@/storage/secureStorage', () => ({
  getToken: jest.fn(),
  saveToken: jest.fn(),
  removeToken: jest.fn(),
}));

jest.mock('react-native-quick-sqlite', () => ({
  open: jest.fn(() => ({
    transaction: jest.fn(),
    executeSql: jest.fn(),
  })),
  initDB: jest.fn(),
  saveUser: jest.fn(),
}));