import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  filteredProducts: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch products
    fetchProductsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetch categories
    fetchCategoriesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Filter products by category
    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      if (categoryId === 'all') {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter(
          (product) => product.category === categoryId
        );
      }
    },

    // Search products
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },

    // Get hot picks
    getHotPicks: (state) => {
      state.filteredProducts = state.allProducts.filter((p) => p.isFeatured);
    },

    // Get popular items
    getPopularItems: (state) => {
      state.filteredProducts = state.allProducts.filter((p) => p.isPopular);
    },

    // Get must try items
    getMustTryItems: (state) => {
      state.filteredProducts = state.allProducts.filter((p) => p.isMustTry);
    },

    // Set selected product
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    // Clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  filterByCategory,
  searchProducts,
  getHotPicks,
  getPopularItems,
  getMustTryItems,
  setSelectedProduct,
  clearSelectedProduct,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
