// product.slice.test.ts
import reducer, { resetProducts } from '../product.slice';
import { getProducts, getProductDetail } from '../product.thunks';
import { ProductState } from '../product.types';
import { Product } from '@/types/product';

describe('productSlice', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'desc',
    image: 'img.png',
    price: 100,
    priceUnit: 'dollar',
  };

  const initialState: ProductState = {
    products: [],
    productDetail: null,
    loading: false,
    refreshing: false,
    loadingDetail: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle resetProducts', () => {
    const state: ProductState = { ...initialState, products: [mockProduct] };
    const newState = reducer(state, resetProducts());
    expect(newState.products).toEqual([]);
  });

  describe('extraReducers', () => {
    it('getProducts.pending should set loading correctly', () => {
      const action = { type: getProducts.pending.type, meta: { arg: {} } };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.refreshing).toBe(false);
    });

    it('getProducts.fulfilled should set products', () => {
      const action = { type: getProducts.fulfilled.type, payload: [mockProduct] };
      const state = reducer(initialState, action);
      expect(state.products).toEqual([mockProduct]);
      expect(state.loading).toBe(false);
      expect(state.refreshing).toBe(false);
    });

    it('getProducts.rejected should set error', () => {
      const action = { type: getProducts.rejected.type, payload: 'Fetch failed' };
      const state = reducer(initialState, action);
      expect(state.error).toBe('Fetch failed');
      expect(state.loading).toBe(false);
      expect(state.refreshing).toBe(false);
    });

    it('getProductDetail.pending should set loadingDetail true', () => {
      const action = { type: getProductDetail.pending.type };
      const state = reducer(initialState, action);
      expect(state.loadingDetail).toBe(true);
    });

    it('getProductDetail.fulfilled should set productDetail', () => {
      const action = { type: getProductDetail.fulfilled.type, payload: mockProduct };
      const state = reducer(initialState, action);
      expect(state.productDetail).toEqual(mockProduct);
      expect(state.loadingDetail).toBe(false);
    });

    it('getProductDetail.rejected should set error', () => {
      const action = { type: getProductDetail.rejected.type, payload: 'Fetch detail failed' };
      const state = reducer(initialState, action);
      expect(state.error).toBe('Fetch detail failed');
      expect(state.loadingDetail).toBe(false);
    });
  });
});