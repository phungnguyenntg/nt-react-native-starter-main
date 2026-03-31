// productService.test.ts
import { getProductsAPI, getProductDetailAPI } from './productService';
import { api } from '@/services/api-service';
import { Product } from '@/types/product';

jest.mock('@/services/api-service');

describe('productService', () => {
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

  describe('getProductsAPI', () => {
    it('should fetch products successfully', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { status: true, data: [mockProduct] },
      });

      const result = await getProductsAPI({});

      expect(api.get).toHaveBeenCalledWith('/product', { params: {} });
      expect(result).toEqual({ status: true, data: [mockProduct] });
    });

    it('should handle empty query', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { status: true, data: [] },
      });

      const result = await getProductsAPI();

      expect(api.get).toHaveBeenCalledWith('/product', { params: undefined });
      expect(result).toEqual({ status: true, data: [] });
    });
  });

  describe('getProductDetailAPI', () => {
    it('should fetch product detail successfully', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { status: true, data: mockProduct },
      });

      const result = await getProductDetailAPI(1);

      expect(api.get).toHaveBeenCalledWith('/product/1');
      expect(result).toEqual({ status: true, data: mockProduct });
    });

    it('should handle product not found', async () => {
      (api.get as jest.Mock).mockResolvedValue({
        data: { status: false, data: null },
      });

      const result = await getProductDetailAPI(999);

      expect(api.get).toHaveBeenCalledWith('/product/999');
      expect(result).toEqual({ status: false, data: null });
    });
  });
});