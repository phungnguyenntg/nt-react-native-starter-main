// auth.slice.test.ts
import reducer, { logout, clearError } from '../auth.slice';
import { initialAuthState } from '../auth.types';
import { loginThunk, logoutThunk } from '../auth.thunks';
import { User } from '@/types/user';

describe('authSlice', () => {
  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    age: 25,
    role: 'user',
    firstName: 'Test',
    lastName: 'User',
    createdAt: '2026-03-31',
    updatedAt: '2026-03-31',
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialAuthState);
  });

  it('should handle logout reducer', () => {
    const state = { ...initialAuthState, user: mockUser };
    const newState = reducer(state, logout());
    expect(newState.user).toBeNull();
  });

  it('should handle clearError reducer', () => {
    const state = { ...initialAuthState, error: 'Some error' };
    const newState = reducer(state, clearError());
    expect(newState.error).toBeNull();
  });

  describe('extraReducers', () => {
    it('should handle loginThunk.pending', () => {
      const state = reducer(initialAuthState, { type: loginThunk.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginThunk.fulfilled', () => {
      const state = reducer(initialAuthState, {
        type: loginThunk.fulfilled.type,
        payload: { user: mockUser, token: 'token123' },
      });
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('should handle loginThunk.rejected', () => {
      const state = reducer(initialAuthState, {
        type: loginThunk.rejected.type,
        payload: 'Login failed',
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Login failed');
    });

    it('should handle logoutThunk.fulfilled', () => {
      const state = reducer({ ...initialAuthState, user: mockUser }, { type: logoutThunk.fulfilled.type });
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
    });

    it('should handle logoutThunk.rejected', () => {
      const state = reducer({ ...initialAuthState, user: mockUser }, {
        type: logoutThunk.rejected.type,
        payload: 'Logout failed',
      });
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBe('Logout failed');
    });
  });
});