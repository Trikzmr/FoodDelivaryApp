import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    filter: filterReducer,
  },
});

export default store;
