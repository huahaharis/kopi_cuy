import { create } from 'zustand';

type CartState = {
  totalItems: number;
  addToCart: (items: number) => void;
  removeFromCart: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  totalItems: 0,
  addToCart: (items) =>
    set((state) => ({
        totalItems: state.totalItems + items
    })),
  removeFromCart: () =>
    set((state) => ({
      totalItems: state.totalItems > 0 ? state.totalItems - 1 : 0,
    })),
  clearCart: () => set({ totalItems: 0 }),
}));