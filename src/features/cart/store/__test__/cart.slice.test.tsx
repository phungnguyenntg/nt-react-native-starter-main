// cart.slice.test.ts
import cartReducer, { addToCart, removeFromCart, clearCart } from '../cart.slice';
import { Product } from '@/features/product/types/product.types';

describe('cartSlice', () => {
  const product: Product = {
    id: 1,
    name: 'Test Product',
    description: 'A product for testing',
    image: 'image.png',
    price: 100,
    priceUnit: 'dollar',
  };

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });

  it('should handle addToCart for new item', () => {
    const state = cartReducer(undefined, addToCart(product));
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 1 });
  });

  it('should handle addToCart for existing item', () => {
    const initialState = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initialState, addToCart(product));
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should handle removeFromCart', () => {
    const initialState = { items: [{ ...product, quantity: 2 }] };
    const state = cartReducer(initialState, removeFromCart(product.id));
    expect(state.items.length).toBe(0);
  });

  it('should handle clearCart', () => {
    const initialState = { items: [{ ...product, quantity: 2 }] };
    const state = cartReducer(initialState, clearCart());
    expect(state.items.length).toBe(0);
  });
});