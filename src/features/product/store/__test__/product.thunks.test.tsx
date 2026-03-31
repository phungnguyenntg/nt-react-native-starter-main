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
    });

    it('should handle failed fetch', async () => {
      (productService.getProductsAPI as jest.Mock).mockResolvedValue({ status: false });
      const dispatch = jest.fn();
      const thunk = getProducts({ query: {} });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProducts/rejected');
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
    });

    it('should handle failed fetch', async () => {
      (productService.getProductDetailAPI as jest.Mock).mockResolvedValue({ status: false });
      const dispatch = jest.fn();
      const thunk = getProductDetail(1);
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('product/getProductDetail/rejected');
    });
  });
});