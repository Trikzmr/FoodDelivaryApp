import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add to wishlist
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);

      if (!exists) {
        state.items.push(product);
      }
    },

    // Remove from wishlist
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    // Check if product is in wishlist
    isInWishlist: (state, action) => {
      return state.items.some((item) => item._id === action.payload);
    },

    // Fetch wishlist
    fetchWishlistRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchWishlistSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchWishlistFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Clear wishlist
    clearWishlist: (state) => {
      state.items = [];
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  clearWishlist,
  clearError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
