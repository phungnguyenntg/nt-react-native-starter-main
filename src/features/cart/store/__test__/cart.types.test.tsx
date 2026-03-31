import { CartState } from '../cart.types';

describe('Cart types', () => {
  it('should have the correct initial shape', () => {
    const initialState: CartState = { items: [] };
    expect(initialState.items).toEqual([]);
  });
});