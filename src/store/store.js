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
      window.location.reload();
    }
  },
  decreaseQuantity: (id) => {
    let cart = get().cart;
    if (cart.find((item) => item.itemId === id).quantity < 2) {
      set((state) => ({
        cart: [],
      }));
    } else {
      set((state) => {
        state.cart[state.cart.findIndex((item) => item.itemId === id)]
          .quantity--;
      });
      window.location.reload();
    }
  },
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.itemId !== id),
    }));
    window.location.reload();
  },
  clearCart: () => {
    set((state) => ({
      cart: [],
    }));
  },
  checkOut: () => {
    set((state) => ({
      cart: [],
    }));
  },
});

const useStore = create(devtools(persist(store)));

export default useStore;
