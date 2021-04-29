import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  cart: [],
  addToCart: (id) => console.log(id),
});

const useStore = create(devtools(persist(store)));

export default useStore;
