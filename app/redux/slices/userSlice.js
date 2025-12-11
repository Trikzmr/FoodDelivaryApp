import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  activeAddress: null,
  addresses: [],
  recentSearches: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Register actions
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.activeAddress = null;
      state.addresses = [];
    },

    // Update profile
    updateProfileRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload };
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Address management
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr._id !== action.payload
      );
    },
    setActiveAddress: (state, action) => {
      state.activeAddress = action.payload;
    },

    // Recent searches
    addRecentSearch: (state, action) => {
      const search = action.payload;
      const filtered = state.recentSearches.filter((s) => s !== search);
      state.recentSearches = [search, ...filtered].slice(0, 10);
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  setAddresses,
  addAddress,
  removeAddress,
  setActiveAddress,
  addRecentSearch,
  clearRecentSearches,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
