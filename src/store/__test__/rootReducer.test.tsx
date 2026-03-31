import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  it('should return the initial state structure', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('product');
    expect(state).toHaveProperty('cart');
  });

  it('should delegate actions to correct slice', () => {
    const prevState = rootReducer(undefined, { type: 'unknown' });

    const nextState = rootReducer(prevState, { type: 'auth/logout' });

    expect(nextState.auth).toBeDefined();
    expect(nextState.product).toEqual(prevState.product);
    expect(nextState.cart).toEqual(prevState.cart);
  });
});