import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/home-screen';
import { useSelector, useDispatch } from 'react-redux';

// mock redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// mock thunk
jest.mock('../src/slices/product/product.thunk', () => ({
  getProducts: jest.fn(),
}));

// mock ProductCard
jest.mock('../src/screens/components/ProductCard', () => {
  return ({ product, onPress }: any) => {
    const { Text } = require('react-native');
    return (
      <Text testID={`product-${product.id}`} onPress={onPress}>
        {product.name}
      </Text>
    );
  };
});

describe('HomeScreen', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  // fix TS
  const mockedUseDispatch = useDispatch as unknown as jest.Mock;
  const mockedUseSelector = useSelector as unknown as jest.Mock;

  // helper navigation + route
  const createNavigation = () => ({
    navigate: mockNavigate,
  });

  const createRoute = () => ({
    key: 'Home',
    name: 'Home',
    params: undefined,
  });

  const renderScreen = () =>
    render(
      <HomeScreen
        navigation={createNavigation() as any}
        route={createRoute() as any}
      />
    );

  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockedUseSelector.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      refreshing: false,
    });

    const { getByTestId } = renderScreen();

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state', () => {
    mockedUseSelector.mockReturnValue({
      products: [],
      loading: false,
      error: 'Failed',
      refreshing: false,
    });

    const { getByText } = renderScreen();

    expect(getByText('Error: Failed')).toBeTruthy();
  });

  it('renders product list', () => {
    mockedUseSelector.mockReturnValue({
      products: [
        { id: 1, name: 'iPhone 14' },
        { id: 2, name: 'Galaxy S23' },
      ],
      loading: false,
      error: null,
      refreshing: false,
    });

    const { getByTestId } = renderScreen();

    expect(getByTestId('product-1')).toBeTruthy();
    expect(getByTestId('product-2')).toBeTruthy();
  });

  it('navigates to product detail when product is pressed', () => {
    mockedUseSelector.mockReturnValue({
      products: [{ id: 1, name: 'iPhone 14' }],
      loading: false,
      error: null,
      refreshing: false,
    });

    const { getByTestId } = renderScreen();

    fireEvent.press(getByTestId('product-1'));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
      productId: 1,
    });
  });

  it('calls dispatch on refresh', () => {
    mockedUseSelector.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      refreshing: false,
    });

    const { getByTestId } = renderScreen();

    const list = getByTestId('product-list');

    fireEvent(list, 'refresh');

    expect(mockDispatch).toHaveBeenCalled();
  });
});