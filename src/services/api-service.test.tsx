// api-service.test.ts
import { api } from './api-service';
import * as secureStorage from '@/storage/secureStorage';

jest.mock('@/storage/secureStorage');

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have correct baseURL and timeout', () => {
    expect(api.defaults.baseURL).toBe('http://10.0.2.2:3000');
    expect(api.defaults.timeout).toBe(10000);
  });

  describe('request interceptor', () => {
    it('should attach Authorization header when token exists', async () => {
      (secureStorage.getToken as jest.Mock).mockResolvedValue('test-token');

      const config: any = { headers: {} };

      const interceptor = api.interceptors.request.handlers![0].fulfilled;

      const result = await interceptor(config);

      expect(secureStorage.getToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should not attach Authorization header if token is null', async () => {
      (secureStorage.getToken as jest.Mock).mockResolvedValue(null);

      const config: any = { headers: {} };

      const interceptor = api.interceptors.request.handlers![0].fulfilled;

      const result = await interceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });
});