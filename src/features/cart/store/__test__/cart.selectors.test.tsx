import { selectCartItems, selectCartCount, selectCartTotal } from '../cart.selectors';
import { CartState } from '../cart.types';
import { AuthState } from '@/features/auth/store/auth.types';
import { ProductState } from '@/features/product/store/product.types';

describe('cart selectors', () => {
  const mockState = {
    auth: {} as AuthState, // mock minimal auth slice
    product: {} as ProductState, // mock minimal product slice
    cart: {
      items: [
        { id: 1, name: 'Product 1', description: '', image: '', price: 100, priceUnit: 'dollar', quantity: 2 },
        { id: 2, name: 'Product 2', description: '', image: '', price: 50, priceUnit: 'dollar', quantity: 1 },
      ],
    } as CartState,
  };

  it('selectCartItems should return items', () => {
    expect(selectCartItems(mockState as any)).toEqual(mockState.cart.items);
  });

  it('selectCartCount should return total quantity', () => {
    expect(selectCartCount(mockState as any)).toBe(3); // 2 + 1
  });

  it('selectCartTotal should return total price', () => {
    expect(selectCartTotal(mockState as any)).toBe(250); // 2*100 + 1*50
  });
});