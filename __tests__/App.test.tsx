import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

// Mock initDB
jest.mock('@/storage/sqliteStorage', () => ({
  initDB: jest.fn(),
}));

// ✅ FIXED: require inside factory
jest.mock('@/shared/components/LoadingOverlay', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    LoadingOverlay: ({ visible }: { visible: boolean }) =>
      visible ? <Text testID="loading">Loading...</Text> : null,
  };
});

// ✅ FIXED
jest.mock('@/navigation/RootNavigator', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    RootNavigator: () => <Text testID="root-nav">App Ready</Text>,
  };
});

// Mock providers
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../src/store/store', () => ({
  store: {},
}));

const { initDB } = require('@/storage/sqliteStorage');

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading then renders RootNavigator', async () => {
    let resolveFn: (() => void) | undefined;

    initDB.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveFn = resolve;
        })
    );

    const { getByTestId, queryByTestId } = render(<App />);

    // Loading visible first
    expect(getByTestId('loading')).toBeTruthy();

    // ✅ Guard before calling
    if (!resolveFn) {
      throw new Error('resolveFn was not set');
    }

    resolveFn();

    await waitFor(() => {
      expect(queryByTestId('loading')).toBeNull();
      expect(getByTestId('root-nav')).toBeTruthy();
    });
  });

  it('renders RootNavigator after DB init', async () => {
    initDB.mockImplementation(() => { });

    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('root-nav')).toBeTruthy();
    });
  });
});