import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'popular', // popular, rating, price_low, price_high
  priceRange: { min: 0, max: 1000 },
  selectedZone: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Set selected category
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Set sort by
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    // Set price range
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    // Set selected zone
    setSelectedZone: (state, action) => {
      state.selectedZone = action.payload;
    },

    // Reset filters
    resetFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.sortBy = 'popular';
      state.priceRange = { min: 0, max: 1000 };
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  setPriceRange,
  setSelectedZone,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
