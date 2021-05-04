import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set, get) => ({
  cart: [],
  addToCart: async (id) => {
    let cart = get().cart;
    const product = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));

    if (!cart.find((item) => item.itemId === id)) {
      set((state) => ({
        cart: [...state.cart, { product, itemId: id, quantity: 1 }],
      }));
    } else {
      set((state) => {
        state.cart[state.cart.findIndex((item) => item.itemId === id)]
          .quantity++;
      });
    }
  },
  removeFromCart: (id) => {
    // console.log(id);
    set((state) => ({
      cart: state.cart.filter((item) => item.itemId !== id),
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
