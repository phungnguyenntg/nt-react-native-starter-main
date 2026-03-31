// product.thunks.test.ts
import { getProducts, getProductDetail } from '../product.thunks';
import * as productService from '../../services/productService';
import { Product } from '@/types/product';

jest.mock('../../services/productService');

describe('Product thunks', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test description',
    image: 'image.png',
    price: 100,
    priceUnit: 'dollar',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should handle successful fetch', async () => {
      (productService.getProductsAPI as jest.Mock).mockResolvedValue({
        status: true,
        data: [mockProduct],
      });

      const dispatch = jest.fn();
      const thunk = getProducts({ query: {} });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(productService.getProductsAPI).toHaveBeenCalled();
      expect(result.payload).toEqual([mockProduct]);
      expect(result.type).toBe('product/getProducts/fulfilled');
    });

    it('should handle failed fetch (status false)', async () => {
      (productService.getProductsAPI as jest.Mock).mockResolvedValue({ status: false });

      const dispatch = jest.fn();
      const thunk = getProducts({ query: {} });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProducts/rejected');
      expect(result.payload).toBe('Fetch failed');
    });

    it('should handle thrown error in API (catch block)', async () => {
      (productService.getProductsAPI as jest.Mock).mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = getProducts({ query: {} });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProducts/rejected');
      expect(result.payload).toBe('Network error');
    });
  });

  describe('getProductDetail', () => {
    it('should handle successful fetch', async () => {
      (productService.getProductDetailAPI as jest.Mock).mockResolvedValue({
        status: true,
        data: mockProduct,
      });

      const dispatch = jest.fn();
      const thunk = getProductDetail(1);
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(productService.getProductDetailAPI).toHaveBeenCalledWith(1);
      expect(result.payload).toEqual(mockProduct);
      expect(result.type).toBe('product/getProductDetail/fulfilled');
    });

    it('should handle failed fetch (status false)', async () => {
      (productService.getProductDetailAPI as jest.Mock).mockResolvedValue({ status: false });

      const dispatch = jest.fn();
      const thunk = getProductDetail(1);
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProductDetail/rejected');
      expect(result.payload).toBe('Fetch detail failed');
    });

    it('should handle thrown error in API (catch block)', async () => {
      (productService.getProductDetailAPI as jest.Mock).mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = getProductDetail(1);
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProductDetail/rejected');
      expect(result.payload).toBe('Network error');
    });
  });
});