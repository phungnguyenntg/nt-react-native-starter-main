import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../rootReducer';
import { renderHook } from '@testing-library/react-native';
import { useAppSelector } from '../hooks';
import { Provider } from 'react-redux';

const createTestStore = () =>
  configureStore({
    reducer: rootReducer,
  });

describe('redux hooks', () => {
  it('useAppSelector works', () => {
    const store = createTestStore();

    const wrapper = ({ children }: any) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAppSelector(state => state.cart.items.length),
      { wrapper }
    );

    expect(result.current).toBe(0);
  });
});