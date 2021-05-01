import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const fetchData = (itemId) => {
  return axios
    .get(`https://fakestoreapi.com/products/${itemId}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const store = (set, get) => ({
  cart: [],
  addToCart: (id) => {
    let cart = get().cart;
    let product = fetchData(id);

    if (!cart.find((item) => item.itemId === id)) {
      set((state) => ({
        cart: [...state.cart, { product: product, itemId: id, quantity: 1 }],
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
