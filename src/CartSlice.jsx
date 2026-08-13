import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      const itemInCart = state.items[plant.id];

      if (itemInCart) {
        itemInCart.quantity += 1;
        return;
      }

      state.items[plant.id] = {
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: plant.image,
        category: plant.category,
        quantity: 1,
      };
    },
    increaseQuantity: (state, action) => {
      const item = state.items[action.payload];

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items[action.payload];

      if (!item) {
        return;
      }

      if (item.quantity === 1) {
        delete state.items[action.payload];
        return;
      }

      item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);

export const selectTotalItems = (state) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  Object.values(state.cart.items).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
