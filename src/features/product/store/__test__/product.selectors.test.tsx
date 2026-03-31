import {
  selectProducts,
  selectProductRefreshing,
  selectProductLoading,
  selectProductError,
  selectProductDetail,
  selectProductLoadingDetail,
} from '../product.selectors';
import { ProductState } from '../product.types';
import { Product } from '@/types/product';

describe('product selectors', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'desc',
    image: 'img.png',
    price: 100,
    priceUnit: 'dollar',
  };

  const mockState = {
    auth: {} as any,
    cart: {} as any,
    product: {
      products: [mockProduct],
      productDetail: mockProduct,
      loading: true,
      refreshing: true,
      loadingDetail: true,
      error: 'Some error',
    } as ProductState,
  };

  it('selectProducts returns products', () => {
    expect(selectProducts(mockState as any)).toEqual([mockProduct]);
  });

  it('selectProductRefreshing returns refreshing', () => {
    expect(selectProductRefreshing(mockState as any)).toBe(true);
  });

  it('selectProductLoading returns loading', () => {
    expect(selectProductLoading(mockState as any)).toBe(true);
  });

  it('selectProductError returns error', () => {
    expect(selectProductError(mockState as any)).toBe('Some error');
  });

  it('selectProductDetail returns productDetail', () => {
    expect(selectProductDetail(mockState as any)).toEqual(mockProduct);
  });

  it('selectProductLoadingDetail returns loadingDetail', () => {
    expect(selectProductLoadingDetail(mockState as any)).toBe(true);
  });
});