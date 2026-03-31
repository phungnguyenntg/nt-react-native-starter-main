// auth.thunks.test.ts
import { loginThunk, logoutThunk } from '../auth.thunks';
import * as authService from '../../services/authService';
import * as secureStorage from '@/storage/secureStorage';
import * as sqliteStorage from '@/storage/sqliteStorage';

jest.mock('../../services/authService');
jest.mock('@/storage/secureStorage');
jest.mock('@/storage/sqliteStorage');

describe('auth thunks', () => {
  const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', age: 25, role: 'user', firstName: 'Test', lastName: 'User', createdAt: '2026-03-31', updatedAt: '2026-03-31' };
  const mockToken = 'token123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginThunk', () => {
    it('should handle successful login', async () => {
      (authService.loginAPI as jest.Mock).mockResolvedValue({
        status: true,
        data: { user: mockUser, token: mockToken },
      });

      const dispatch = jest.fn();
      const thunk = loginThunk({ username: 'test', password: '123' });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(authService.loginAPI).toHaveBeenCalled();
      expect(secureStorage.saveToken).toHaveBeenCalledWith(mockToken);
      expect(sqliteStorage.saveUser).toHaveBeenCalledWith(mockUser);
      expect(result.payload).toEqual({ user: mockUser, token: mockToken });
    });

    it('should handle failed login', async () => {
      (authService.loginAPI as jest.Mock).mockResolvedValue({ status: false });
      const dispatch = jest.fn();
      const thunk = loginThunk({ username: 'test', password: '123' });
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(result.type).toBe('auth/login/rejected');
    });
  });

  describe('logoutThunk', () => {
    it('should handle successful logout', async () => {
      (authService.logoutAPI as jest.Mock).mockResolvedValue(true);
      const dispatch = jest.fn();
      const thunk = logoutThunk();
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(authService.logoutAPI).toHaveBeenCalled();
      expect(secureStorage.removeToken).toHaveBeenCalled();
      expect(result.payload).toBe(true);
    });

    it('should handle failed logout', async () => {
      (authService.logoutAPI as jest.Mock).mockRejectedValue(new Error('Logout failed'));
      const dispatch = jest.fn();
      const thunk = logoutThunk();
      const result = await thunk(dispatch, () => ({}), undefined);

      expect(secureStorage.removeToken).toHaveBeenCalled();
      expect(result.type).toBe('auth/logout/rejected');
    });
  });
});