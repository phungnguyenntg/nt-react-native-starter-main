// ProductListScreen.test.tsx
import { useAppSelector } from '@/store/hooks';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import * as productThunks from '../../store/product.thunks';
import { ProductListScreen } from './ProductListScreen';

jest.mock('../../store/product.thunks', () => ({
    getProducts: jest.fn((args) => jest.fn()),
}));

const mockNavigation = { navigate: jest.fn() };
const mockRoute = { params: {} };

const mockDispatch = jest.fn();
jest.mock('@/store/hooks', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: jest.fn(),
}));

jest.mock('../../components/ProductItem/ProductItem', () => {
    const React = require('react');
    const { Text, TouchableOpacity } = require('react-native');
    return {
        ProductItem: ({ product, onPress, onAddPress }: any) => (
            <TouchableOpacity onPress={onPress}>
                <Text>{product.name}</Text>
                <TouchableOpacity onPress={onAddPress}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        ),
    };
});

jest.mock('@/assets/icons/search.svg', () => 'SearchLogo');
jest.mock('@/shared/components/Separator', () => ({ Separator: () => null }));

describe('ProductListScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('dispatches getProducts on mount', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector.name === 'selectProducts') return [];
            if (selector.name === 'selectProductLoading') return false;
            if (selector.name === 'selectProductError') return null;
            if (selector.name === 'selectProductRefreshing') return false;
            return null;
        });

        render(<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any} />);

        expect(mockDispatch).toHaveBeenCalled();
        expect(typeof mockDispatch.mock.calls[0][0]).toBe('function');
    });

    it('renders loading indicator when loading', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector.name === 'selectProductLoading') return true;
            return null;
        });

        const { getByTestId } = render(<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('renders error message when error exists', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector.name === 'selectProductLoading') return false;
            if (selector.name === 'selectProductError') return 'Something went wrong';
            return null;
        });

        const { getByText } = render(<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any} />);
        expect(getByText('Error: Something went wrong')).toBeTruthy();
    });

    it('renders product list correctly', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector.name === 'selectProducts') return [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
            ];
            if (selector.name === 'selectProductLoading') return false;
            if (selector.name === 'selectProductError') return null;
            if (selector.name === 'selectProductRefreshing') return false;
            return null;
        });

        const { getByText, getAllByText } = render(<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any} />);

        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Product 2')).toBeTruthy();

        const addButtons = getAllByText('Add');
        fireEvent.press(addButtons[0]);
        expect(productThunks.getProducts).toHaveBeenCalledWith({ query: {} });
    });

    it('renders "No product found" when product list is empty', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector.name === 'selectProducts') return [];
            if (selector.name === 'selectProductLoading') return false;
            if (selector.name === 'selectProductError') return null;
            return null;
        });

        const { getByText } = render(<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any} />);
        expect(getByText('No product found')).toBeTruthy();
    });
});