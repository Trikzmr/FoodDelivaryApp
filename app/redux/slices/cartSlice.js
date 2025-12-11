import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  total: 0,
  coupon: null,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const { productId, name, price, image, quantity, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          name,
          price,
          image,
          quantity,
          size,
        });
      }

      calculateTotals(state);
    },

    // Update item quantity
    updateCartItem: (state, action) => {
      const { productId, quantity, size } = action.payload;
      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => !(item.productId === productId && item.size === size)
          );
        } else {
          item.quantity = quantity;
        }
      }

      calculateTotals(state);
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );

      calculateTotals(state);
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.deliveryFee = 0;
      state.total = 0;
      state.coupon = null;
      state.discount = 0;
    },

    // Apply coupon
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.coupon = code;
      state.discount = discount;

      calculateTotals(state);
    },

    // Remove coupon
    removeCoupon: (state) => {
      state.coupon = null;
      state.discount = 0;

      calculateTotals(state);
    },

    // Set delivery fee
    setDeliveryFee: (state, action) => {
      state.deliveryFee = action.payload;
      calculateTotals(state);
    },

    // Set tax
    setTax: (state, action) => {
      state.tax = action.payload;
      calculateTotals(state);
    },
  },
});

// Helper function to calculate totals
const calculateTotals = (state) => {
  state.subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!state.tax) {
    state.tax = Math.round(state.subtotal * 0.05 * 100) / 100; // 5% tax
  }

  state.total =
    state.subtotal + state.tax + state.deliveryFee - state.discount;
};

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  setDeliveryFee,
  setTax,
} = cartSlice.actions;

export default cartSlice.reducer;
