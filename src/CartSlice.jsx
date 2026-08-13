import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
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
    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items[id];

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        delete state.items[id];
        return;
      }

      item.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, clearCart, removeItem, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);

export const selectTotalItems = (state) =>
  Object.values(state.cart.items).reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  Object.values(state.cart.items).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
