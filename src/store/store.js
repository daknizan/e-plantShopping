import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../CartSlice.jsx';

const STORAGE_KEY = 'paradise-nursery-cart';

function loadSavedCart() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadSavedCart(),
});

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
});
