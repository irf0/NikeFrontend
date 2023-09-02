//Setup the cart.
import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //addToCart
    addItemToCart(state, action) {
      const newProductId = action.payload;
      const existingItem = state.items.find(
        (item) => item.newItem._id === newProductId._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it to the cart with qty 1.
        const itemToAdd = { newItem: newProductId, quantity: 1 };
        state.items.push(itemToAdd);
      }
    },

    //incQty
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.newItem._id === itemId);
      if (item.quantity >= 1) {
        item.quantity += 1;
      }
    },

    //decQty
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.newItem.id === itemId);
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addItemToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
