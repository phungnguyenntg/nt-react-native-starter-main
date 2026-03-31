import { store } from '../store';

describe('store', () => {
  it('should initialize with correct state shape', () => {
    const state = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('product');
    expect(state).toHaveProperty('cart');
  });

  it('should handle dispatching an action', () => {
  store.dispatch({
    type: 'cart/addToCart',
    payload: {
      id: 1,
      name: 'Test',
      description: '',
      image: '',
      price: 100,
      priceUnit: 'dollar',
    },
  });

  const state = store.getState();

  expect(state.cart.items.length).toBe(1);
});

  it('should disable serializableCheck middleware', () => {
    expect(() => {
      store.dispatch({
        type: 'test/nonSerializable',
        payload: { func: () => {} },
      });
    }).not.toThrow();
  });
});