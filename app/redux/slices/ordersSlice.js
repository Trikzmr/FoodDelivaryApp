import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Create order
    createOrderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload);
      state.error = null;
    },
    createOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetch orders
    fetchOrdersRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Get order details
    getOrderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    getOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Cancel order
    cancelOrderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    cancelOrderSuccess: (state, action) => {
      state.isLoading = false;
      const orderId = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = 'cancelled';
      }
      if (state.currentOrder && state.currentOrder._id === orderId) {
        state.currentOrder.status = 'cancelled';
      }
      state.error = null;
    },
    cancelOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update order status (for real-time updates)
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.currentOrder && state.currentOrder._id === orderId) {
        state.currentOrder.status = status;
      }
    },

    // Update delivery location
    updateDeliveryLocation: (state, action) => {
      const { orderId, location } = action.payload;
      if (state.currentOrder && state.currentOrder._id === orderId) {
        state.currentOrder.riderLocation = location;
      }
    },

    // Clear current order
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFailure,
  updateOrderStatus,
  updateDeliveryLocation,
  clearCurrentOrder,
  clearError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
