import { ProductState } from '../product.types';

describe('Product types', () => {
  it('should have correct initial shape', () => {
    const initialState: ProductState = {
      products: [],
      productDetail: null,
      loading: false,
      refreshing: false,
      loadingDetail: false,
      error: null,
    };
    expect(initialState.products).toEqual([]);
    expect(initialState.productDetail).toBeNull();
    expect(initialState.loading).toBe(false);
    expect(initialState.refreshing).toBe(false);
    expect(initialState.loadingDetail).toBe(false);
    expect(initialState.error).toBeNull();
  });
});