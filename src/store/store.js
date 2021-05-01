import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set, get) => ({
  cart: [],
  addToCart: (id) => {
    let cart = get().cart;
    if (!cart.find((item) => item.itemId === id)) {
      set((state) => ({
        cart: [...state.cart, { itemId: id, quantity: 1 }],
      }));
    } else {
      set((state) => {
        state.cart[state.cart.findIndex((item) => item.itemId === id)]
          .quantity++;
      });
    }
  },
  removeFromCart: (id) => {
    set((state) => ({
      cart: [state.cart.filter((item) => item.itemId !== id)],
    }));
  },
  clearCart: () => {
    set((state) => ({
      cart: [],
    }));
  },
});

const useStore = create(devtools(persist(store)));

export default useStore;
