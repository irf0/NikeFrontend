//Setup the cart.
import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //addToCart
    addItemToCart(state, action) {
      const newProductId = action.payload;
      const existingItem = state.items.find((item) => item.id === newProductId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it to the cart with qty 1.
        const newItem = products.find((item) => item.id === newProductId);
        if (newItem) {
          const itemToAdd = { ...newItem, quantity: 1 };
          state.items.push(itemToAdd);
          state.totalPrice += newItem.price;
        }
      }
    },

    //incQty
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item.quantity >= 1) {
        item.quantity += 1;
      }
    },

    //decQty
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addItemToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
